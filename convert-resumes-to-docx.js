/**
 * convert-resumes-to-docx.js
 * Converts all .txt resume files in test-resumes/ to properly formatted .docx Word documents.
 * Run: node convert-resumes-to-docx.js
 */

const fs   = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  BorderStyle, AlignmentType, SpacingType, UnderlineType,
  TabStopPosition, TabStopType,
} = require('docx');

const INPUT_DIR  = path.join(__dirname, 'test-resumes');
const OUTPUT_DIR = path.join(__dirname, 'test-resumes');

// ─── Helpers ───────────────────────────────────────────────────────────────────

function isSectionHeader(line) {
  const t = line.trim();
  // ALL-CAPS short line (SUMMARY, EXPERIENCE, SKILLS, EDUCATION, PROFILE, etc.)
  return t.length > 0 && t.length < 40 && t === t.toUpperCase() && /^[A-Z]/.test(t);
}

function isBullet(line) {
  return /^\s*[•\-\*]/.test(line);
}

function stripBullet(line) {
  return line.replace(/^\s*[•\-\*]\s*/, '').trim();
}

function isJobTitle(line) {
  // Matches: "Title — Company, Location (Year–Year)" or "Title — Company (Year–Year)"
  return (/(—|–)/.test(line) && /\d{4}/.test(line));
}

// ─── Paragraph builders ────────────────────────────────────────────────────────

// Candidate name — large, bold, dark
function nameParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 44,           // 22pt
        color: '1a1a2e',
        font: 'Calibri',
      }),
    ],
    spacing: { after: 40 },
  });
}

// Contact / location line — small, grey
function contactParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 18,           // 9pt
        color: '6b7280',
        font: 'Calibri',
      }),
    ],
    spacing: { after: 20 },
  });
}

// Thin horizontal rule (rendered as a bottom border on an empty paragraph)
function dividerParagraph() {
  return new Paragraph({
    text: '',
    border: {
      bottom: {
        color: '4f46e5',
        space: 1,
        style: BorderStyle.SINGLE,
        size: 12,           // 1.5pt
      },
    },
    spacing: { after: 120 },
  });
}

// Section heading — bold, indigo, underlined
function sectionParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 20,           // 10pt
        color: '4f46e5',
        font: 'Calibri',
      }),
    ],
    border: {
      bottom: {
        color: 'e5e7eb',
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    spacing: { before: 160, after: 80 },
  });
}

// Job title / company line — bold, dark grey
function jobTitleParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 19,           // 9.5pt
        color: '374151',
        font: 'Calibri',
      }),
    ],
    spacing: { before: 80, after: 40 },
  });
}

// Bullet point — indented, with a real bullet character
function bulletParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 19,           // 9.5pt
        color: '4b5563',
        font: 'Calibri',
      }),
    ],
    bullet: { level: 0 },
    spacing: { after: 40 },
    indent: { left: 360, hanging: 360 },
  });
}

// Regular body text
function bodyParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 19,           // 9.5pt
        color: '4b5563',
        font: 'Calibri',
      }),
    ],
    spacing: { after: 40 },
  });
}

// Empty spacer
function spacerParagraph(spaceAfter = 60) {
  return new Paragraph({ text: '', spacing: { after: spaceAfter } });
}

// ─── Main builder ──────────────────────────────────────────────────────────────

function buildDocx(text) {
  const lines = text.split('\n');
  const paragraphs = [];
  let lineIndex = 0;

  // Line 1: Candidate name
  const nameLine = lines[lineIndex]?.trim() || 'Candidate';
  paragraphs.push(nameParagraph(nameLine));
  lineIndex++;

  // Line 2: Contact info
  if (lines[lineIndex]?.trim()) {
    paragraphs.push(contactParagraph(lines[lineIndex].trim()));
    lineIndex++;
  }

  // Line 3: Location (if it doesn't look like a section header)
  if (lines[lineIndex]?.trim() && !isSectionHeader(lines[lineIndex])) {
    paragraphs.push(contactParagraph(lines[lineIndex].trim()));
    lineIndex++;
  }

  // Horizontal divider
  paragraphs.push(dividerParagraph());

  // Rest of resume
  for (let i = lineIndex; i < lines.length; i++) {
    const raw   = lines[i];
    const trimmed = raw.trim();

    if (!trimmed) {
      paragraphs.push(spacerParagraph(60));
      continue;
    }

    if (isSectionHeader(trimmed)) {
      paragraphs.push(sectionParagraph(trimmed));
      continue;
    }

    if (isJobTitle(trimmed)) {
      paragraphs.push(jobTitleParagraph(trimmed));
      continue;
    }

    if (isBullet(raw)) {
      paragraphs.push(bulletParagraph(stripBullet(raw)));
      continue;
    }

    paragraphs.push(bodyParagraph(trimmed));
  }

  return new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 19 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top:    720,   // 0.5 inch = 720 twips
              bottom: 720,
              left:   900,   // 0.625 inch
              right:  900,
            },
          },
        },
        children: paragraphs,
      },
    ],
  });
}

// ─── Run ───────────────────────────────────────────────────────────────────────

async function main() {
  const files = fs.readdirSync(INPUT_DIR).filter((f) => f.endsWith('.txt'));

  if (files.length === 0) {
    console.log('No .txt files found in test-resumes/');
    return;
  }

  console.log(`Converting ${files.length} resumes to .docx...\n`);
  let ok = 0;
  let failed = 0;

  for (const file of files) {
    const inputPath  = path.join(INPUT_DIR, file);
    const outputName = file.replace(/\.txt$/, '.docx');
    const outputPath = path.join(OUTPUT_DIR, outputName);

    try {
      const text = fs.readFileSync(inputPath, 'utf-8');
      const doc  = buildDocx(text);
      const buf  = await Packer.toBuffer(doc);
      fs.writeFileSync(outputPath, buf);
      console.log(`  ✅  ${outputName}`);
      ok++;
    } catch (err) {
      console.error(`  ❌  ${file}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone — ${ok} Word docs created, ${failed} failed.`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
