const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

/**
 * Extract raw text from a file buffer based on MIME type or extension
 * @param {Buffer} buffer - File contents
 * @param {string} filename - Original filename (used to detect type)
 * @param {string} mimetype - MIME type from multer
 * @returns {Promise<string>} Extracted plain text
 */
async function extractText(buffer, filename, mimetype) {
  const ext = path.extname(filename).toLowerCase();

  const isPdf =
    mimetype === 'application/pdf' || ext === '.pdf';
  const isDocx =
    mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    ext === '.docx' ||
    mimetype === 'application/msword' ||
    ext === '.doc';

  if (isPdf) {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (isDocx) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  // Fallback: try as plain text
  return buffer.toString('utf-8');
}

module.exports = { extractText };
