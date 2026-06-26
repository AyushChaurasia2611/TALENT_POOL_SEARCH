// llama-3.3-70b-versatile on Groq LPU — ~1-2s per request, free tier, excellent JSON output
const MODEL = 'llama-3.3-70b-versatile';
const TIMEOUT_MS = 20000;

const SYSTEM_PROMPT = `You are a resume data extraction API. You output ONLY valid JSON — no explanation, no markdown, no extra text.`;

const USER_PROMPT = `Extract structured data from this resume. Return ONLY this JSON object, nothing else:

{
  "skills": ["skill1", "skill2"],
  "years_experience": 5,
  "most_recent_title": "Software Engineer",
  "location": "London, UK"
}

Rules:
- skills: up to 20 concrete technical or professional skills (e.g. Python, Figma, SQL, Project Management)
- years_experience: integer — total years of professional experience, calculated from job dates
- most_recent_title: exact job title from most recent role
- location: city and country, or "Remote". Use null only if truly not found.

Resume:
`;

/**
 * Extract a JSON object from the model response — handles markdown fences + leading text.
 */
function extractJson(raw) {
  // Strip markdown fences
  let cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  // Try direct parse
  try { return JSON.parse(cleaned); } catch (_) {}
  // Find first {...} block
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch (_) {}
  }
  return null;
}

/**
 * Use Groq to extract structured data from scrubbed resume text.
 * @param {string} scrubbedText - PII-free resume text
 * @returns {Promise<{skills: string[], years_experience: number|null, most_recent_title: string|null, location: string|null}>}
 */
async function extractWithAI(scrubbedText) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY; // read lazily after dotenv loads

  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set in .env — get a free key at console.groq.com');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0,       // deterministic — best for structured output
        max_tokens: 400,      // JSON output is small; cap for speed
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user',   content: USER_PROMPT + scrubbedText },
        ],
      }),
    });
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Groq request timed out after 20s');
    throw err;
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error ${response.status}: ${errorText}`);
  }

  const data    = await response.json();
  const rawText = data.choices?.[0]?.message?.content || '';
  const parsed  = extractJson(rawText);

  if (!parsed) {
    console.warn('Could not parse Groq response as JSON. Raw:', rawText.slice(0, 200));
  }

  return {
    skills:            Array.isArray(parsed?.skills) ? parsed.skills : [],
    years_experience:  typeof parsed?.years_experience === 'number' ? parsed.years_experience : null,
    most_recent_title: parsed?.most_recent_title || null,
    location:          parsed?.location || null,
  };
}

module.exports = { extractWithAI };
