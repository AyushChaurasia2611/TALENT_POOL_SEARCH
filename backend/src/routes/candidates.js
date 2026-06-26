const express = require('express');
const supabase = require('../services/db');
const { getPresignedUrl } = require('../services/s3');

const router = express.Router();

// ─── GET /api/candidates ──────────────────────────────────────────────────────
// Supports query params:
//   skill       - keyword match against skills array
//   min_exp     - minimum years of experience
//   location    - location keyword match
//   page        - page number (default 1)
//   limit       - results per page (default 20)
router.get('/candidates', async (req, res) => {
  try {
    const { skill, min_exp, location, page = 1, limit = 50 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = supabase
      .from('candidates')
      .select('id, name, email, phone, linkedin_url, github_url, skills, years_experience, most_recent_title, location, file_name, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + Number(limit) - 1);

    // Filter: skill keyword
    if (skill && skill.trim()) {
      query = query.ilike('skills', `%${skill.trim()}%`);
    }

    // Filter: minimum years of experience
    if (min_exp && !isNaN(Number(min_exp))) {
      query = query.gte('years_experience', Number(min_exp));
    }

    // Filter: location keyword
    if (location && location.trim()) {
      query = query.ilike('location', `%${location.trim()}%`);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({
      candidates: data,
      total: count,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    console.error('GET /candidates error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/candidates/:id ──────────────────────────────────────────────────
router.get('/candidates/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Candidate not found' });

    // Generate presigned S3 URL for the resume file (if stored)
    let resumeUrl = null;
    if (data.s3_key) {
      try {
        resumeUrl = await getPresignedUrl(data.s3_key);
      } catch (s3Err) {
        console.warn('Could not generate presigned URL:', s3Err.message);
      }
    }

    res.json({ ...data, resume_url: resumeUrl });
  } catch (err) {
    console.error(`GET /candidates/${req.params.id} error:`, err);
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /api/candidates/:id ───────────────────────────────────────────────
router.delete('/candidates/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error(`DELETE /candidates/${req.params.id} error:`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
