const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const { extractText } = require('../services/parser');
const { extractPii, scrubPii } = require('../services/piiScrubber');
const { extractWithAI } = require('../services/aiExtractor');
const { uploadToS3 } = require('../services/s3');
const supabase = require('../services/db');

const router = express.Router();

// ─── Multer v2 config (in-memory storage) ────────────────────────────────────
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const allowedExts = /\.(pdf|doc|docx)$/i;

    if (allowedMimes.includes(file.mimetype) || allowedExts.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', `Unsupported type: ${file.mimetype}`));
    }
  },
});

// ─── In-memory job store ──────────────────────────────────────────────────────
// Maps jobId → { total, processed, errors, results, status }
const jobs = new Map();

// ─── POST /api/upload ─────────────────────────────────────────────────────────
router.post('/upload', (req, res) => {
  const multerMiddleware = upload.array('resumes', 50);

  multerMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const jobId = uuidv4();
    jobs.set(jobId, {
      total: req.files.length,
      processed: 0,
      errors: [],
      results: [],
      status: 'processing',
    });

    // Respond immediately with the job ID
    res.json({ jobId, total: req.files.length });

    // Process files asynchronously
    processFiles(jobId, req.files);
  });
});

// ─── GET /api/jobs/:jobId ─────────────────────────────────────────────────────
router.get('/jobs/:jobId', (req, res) => {
  const job = jobs.get(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

// ─── File Processing Pipeline ─────────────────────────────────────────────────
async function processFiles(jobId, files) {
  const job = jobs.get(jobId);

  for (const file of files) {
    try {
      // 1. Extract raw text locally (no external calls)
      const rawText = await extractText(file.buffer, file.originalname, file.mimetype);
      console.log(`  📄 [${file.originalname}] text length: ${rawText.length} chars`);
      if (rawText.length < 50) {
        console.warn(`  ⚠️  [${file.originalname}] very short text — may be a scanned/image PDF`);
        console.warn(`  ⚠️  Raw text: "${rawText.slice(0, 100)}"`);
      }

      // 2. Extract PII from raw text BEFORE scrubbing
      const piiData = extractPii(rawText);
      console.log(`  👤 [${file.originalname}] PII: name="${piiData.name}" email="${piiData.email}"`);

      // 3. Scrub all PII from text
      const scrubbedText = scrubPii(rawText);

      // 4. Upload original file to S3 (non-fatal)
      let s3Key = null;
      try {
        const s3Result = await uploadToS3(file.buffer, file.originalname, file.mimetype);
        s3Key = s3Result.key;
      } catch (s3Err) {
        console.warn(`  ⚠️  S3 skipped for "${file.originalname}":`, s3Err.message);
      }

      // 5. Send ONLY scrubbed text to AI
      console.log(`  🤖 [${file.originalname}] calling Groq...`);
      const aiData = await extractWithAI(scrubbedText);
      console.log(`  ✅ [${file.originalname}] AI result:`, JSON.stringify(aiData));

      // 6. Save everything to Supabase
      const { data: candidate, error } = await supabase
        .from('candidates')
        .insert({
          name: piiData.name,
          email: piiData.email,
          phone: piiData.phone,
          linkedin_url: piiData.linkedin_url,
          github_url: piiData.github_url,
          skills: aiData.skills,
          years_experience: aiData.years_experience,
          most_recent_title: aiData.most_recent_title,
          location: aiData.location,
          scrubbed_text: scrubbedText,
          s3_key: s3Key,
          file_name: file.originalname,
        })
        .select()
        .single();

      if (error) throw new Error(`DB insert failed: ${error.message}`);

      job.results.push({
        id: candidate.id,
        name: candidate.name || file.originalname,
      });
    } catch (err) {
      console.error(`Error processing "${file.originalname}":`, err.message);
      job.errors.push({ file: file.originalname, error: err.message });
    }

    job.processed += 1;
  }

  job.status = 'done';
  console.log(`✅ Job ${jobId} done: ${job.results.length} ok, ${job.errors.length} errors`);
}

module.exports = router;
