/**
 * PII Scrubber — runs on raw extracted resume text
 *
 * Two responsibilities:
 *  1. extractPii()  — regex-extract contact details BEFORE scrubbing
 *  2. scrubPii()    — replace PII tokens with placeholders for AI
 */

// ─── Regex Patterns ──────────────────────────────────────────────────────────

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

// Matches international and US phone formats
const PHONE_REGEX =
  /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;

// LinkedIn profile URLs
const LINKEDIN_REGEX =
  /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_\-\.%]+\/?/gi;

// GitHub profile URLs
const GITHUB_REGEX =
  /(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_\-\.]+\/?/gi;

// ─── Name Extraction (heuristic) ─────────────────────────────────────────────
/**
 * Attempt to extract candidate name from the first non-empty lines.
 * This is best-effort — real NLP would do better, but we keep it local/cheap.
 */
function extractName(text) {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines.slice(0, 8)) {
    // Skip lines that look like contact info or headers
    if (EMAIL_REGEX.test(line)) { EMAIL_REGEX.lastIndex = 0; continue; }
    if (PHONE_REGEX.test(line))  { PHONE_REGEX.lastIndex = 0; continue; }
    if (LINKEDIN_REGEX.test(line)) { LINKEDIN_REGEX.lastIndex = 0; continue; }
    if (/resume|curriculum|cv|objective|summary|profile/i.test(line)) continue;
    if (line.length > 60) continue; // Likely a sentence, not a name
    if (line.split(' ').length < 2) continue; // Need at least first + last

    // Looks like a name — Title Case words
    const words = line.split(/\s+/);
    if (words.every((w) => /^[A-Z][a-z]+$/.test(w) || /^[A-Z]+$/.test(w))) {
      return line;
    }
    // Looser: capitalised words that aren't all caps sentences
    if (words.length <= 4 && words.every((w) => /^[A-Za-z\-'.]+$/.test(w))) {
      return line;
    }
  }

  return null;
}

// ─── PII Extraction ───────────────────────────────────────────────────────────
/**
 * Extract PII from raw text BEFORE scrubbing.
 * @param {string} text Raw resume text
 * @returns {{ name: string|null, email: string|null, phone: string|null, linkedin: string|null, github: string|null }}
 */
function extractPii(text) {
  // Reset lastIndex before each match
  const emails = text.match(EMAIL_REGEX) || [];
  const phones = text.match(PHONE_REGEX) || [];
  const linkedins = text.match(LINKEDIN_REGEX) || [];
  const githubs = text.match(GITHUB_REGEX) || [];

  return {
    name: extractName(text),
    email: emails[0] || null,
    phone: phones[0] || null,
    linkedin_url: linkedins[0] ? linkedins[0].trim() : null,
    github_url: githubs[0] ? githubs[0].trim() : null,
  };
}

// ─── PII Scrubbing ────────────────────────────────────────────────────────────
/**
 * Replace all PII in text with placeholders.
 * @param {string} text Raw resume text
 * @returns {string} Scrubbed text safe to send to AI
 */
function scrubPii(text) {
  return text
    .replace(LINKEDIN_REGEX, '[LINKEDIN]')   // LinkedIn before email (contains @)
    .replace(GITHUB_REGEX, '[GITHUB]')
    .replace(EMAIL_REGEX, '[EMAIL]')
    .replace(PHONE_REGEX, '[PHONE]');
}

module.exports = { extractPii, scrubPii };
