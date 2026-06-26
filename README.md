# 🎯 TalentPool — AI-Powered Resume Search

A web application for recruiters to upload, parse, and search resumes using AI. Built with Node.js, React, Supabase, AWS S3, and Llama 3.3 70B via Groq.

---

## ✨ Features

- **Bulk resume upload** — drag-and-drop up to 50 PDF or Word documents at once
- **PII-safe AI processing** — contact details extracted locally via regex; only anonymised text sent to AI
- **AI extraction** — Groq (Llama 3.3 70B) extracts skills, years of experience, job title, and location
- **Real-time progress** — live progress indicator while resumes are processed
- **Searchable talent pool** — filter by skill keyword, minimum experience, and location
- **Candidate detail modal** — full contact info, skills, and original file download link

---

## 🛠 Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Backend | Node.js + Express | Fast setup, great PDF/DOCX parsing ecosystem |
| Frontend | React + Vite | Modern, component-based, fast dev experience |
| Database | Supabase (PostgreSQL) | Free tier, instant REST API, easy setup |
| File Storage | AWS S3 | Industry standard, free tier, presigned URL support |
| AI Model | **Llama 3.3 70B (via Groq)** | LPU hardware = ~1–2s/resume, free tier (14,400 req/day), no CC needed |
| PDF Parsing | `pdf-parse` | Local extraction — no external calls |
| DOCX Parsing | `mammoth` | Reliable Word doc → plain text conversion |

---

## 🔐 PII Handling

The application implements a strict privacy-first pipeline:

```
Raw Resume Text
      │
      ▼
[Regex Extraction] ──→ Saves: name, email, phone, LinkedIn, GitHub to DB
      │
      ▼  
[PII Scrubbing]
• email        → [EMAIL]
• phone        → [PHONE]
• LinkedIn URL → [LINKEDIN]
• GitHub URL   → [GITHUB]
      │
      ▼
Scrubbed Text → Groq (Llama 3.3 70B) → skills, experience, title, location
```

**The AI model never sees any personal contact information.**

---

## 🚀 Local Setup

### Prerequisites

- Node.js 18+
- npm 8+
- A [Supabase](https://supabase.com) project (free tier)
- An [AWS account](https://aws.amazon.com) with S3 bucket (free tier)
- A [Groq](https://console.groq.com) API key (free — no credit card needed)

---

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd TA-assignment

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install
```

### 2. Set Up Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema:

```bash
# Copy the schema file contents:
cat backend/supabase-schema.sql
```

Paste and run in the Supabase SQL Editor. This creates the `candidates` table with indexes and an RLS policy.

### 3. Configure Environment Variables

**Backend** — copy and fill in:
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
S3_BUCKET_NAME=your-bucket-name

# Groq (free at console.groq.com — no CC required)
GROQ_API_KEY=your-groq-api-key

# Server
PORT=3001
FRONTEND_URL=http://localhost:5173
```

**Frontend** — already configured for local dev via Vite proxy. No changes needed.

### 4. Configure AWS S3

1. Create an S3 bucket in your chosen region
2. Set bucket policy to block public access (files are accessed via presigned URLs)
3. Create an IAM user with `s3:PutObject` and `s3:GetObject` permissions on your bucket
4. Add the credentials to `backend/.env`

> **Note:** S3 upload is non-fatal — if credentials are missing or misconfigured, resumes will still be processed and stored in Supabase. Only the file download link will be unavailable.

### 5. Run the Application

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server starts on http://localhost:3001
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# App opens at http://localhost:5173
```

### 6. Load Test Data

30 realistic fake resumes are included in `test-resumes/`. Upload them via the web UI, or re-generate them:

```bash
node generate-resumes.js
```

The test data includes:
- **Roles:** Software Engineers, Designers, Product Managers, Sales, Operations, Data Scientists, DevOps, Marketing, Cybersecurity, HR, Finance
- **Levels:** Junior (1–2 yrs), Mid (3–6 yrs), Senior (7–12 yrs), Staff/Director (12+ yrs)
- **Locations:** San Francisco, London, New York, Austin, Berlin, Tokyo, Dubai, Lagos, Dublin, Remote
- **Variety:** Some with career gaps, overlapping skills, non-English names, different date formats

---

## 📁 Project Structure

```
TA-assignment/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express entry point
│   │   ├── routes/
│   │   │   ├── upload.js          # POST /api/upload, GET /api/jobs/:id
│   │   │   └── candidates.js      # GET/DELETE /api/candidates
│   │   └── services/
│   │       ├── parser.js          # PDF + DOCX text extraction
│   │       ├── piiScrubber.js     # Regex PII extraction + scrubbing
│   │       ├── aiExtractor.js     # Groq (Llama 3.3 70B) structured extraction
│   │       ├── s3.js              # AWS S3 upload + presigned URLs
│   │       └── db.js              # Supabase client
│   ├── supabase-schema.sql        # Database schema (run in Supabase SQL Editor)
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                # Router + navigation
│   │   ├── App.css                # Full design system
│   │   ├── pages/
│   │   │   ├── Upload.jsx         # Page 1: Upload + progress
│   │   │   └── Search.jsx         # Page 2: Search + filter
│   │   ├── components/
│   │   │   ├── CandidateCard.jsx  # Grid card component
│   │   │   └── CandidateModal.jsx # Candidate detail modal
│   │   └── api/client.js          # Typed API client
│   └── package.json
│
├── test-resumes/                   # 30 generated fake resumes (.txt + .docx + .pdf)
├── generate-resumes.js             # Script to regenerate test data
├── convert-resumes-to-docx.js      # Converts .txt resumes to formatted Word docs
├── part1-product-note.md           # Part 1: Product review of neuf.engage-ai.tech
├── writeup.md                      # Part 2: Technical decisions writeup
└── README.md
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/upload` | Upload resume files (multipart/form-data, field: `resumes`) |
| `GET` | `/api/jobs/:jobId` | Poll processing job status |
| `GET` | `/api/candidates` | List candidates (query: `skill`, `min_exp`, `location`) |
| `GET` | `/api/candidates/:id` | Get candidate by ID (includes S3 presigned URL) |
| `DELETE` | `/api/candidates/:id` | Delete candidate |
| `GET` | `/api/health` | Health check |

---

## 🤖 AI Model Choice

**Model:** Llama 3.3 70B Versatile  
**Provider:** [Groq](https://console.groq.com) — `llama-3.3-70b-versatile`

**Why Groq + Llama 3.3 70B:**
- **LPU hardware** — Groq's Language Processing Units deliver ~1–2s inference per resume (vs 10–30s on GPU APIs)
- **Free tier** — 14,400 requests/day, no credit card required
- **70B parameter model** — strong instruction-following, reliably returns clean JSON
- **OpenAI-compatible API** — simple integration, easy to switch models if needed
- **Recommended in the assignment brief** — Groq is explicitly listed as a preferred option

**Prompt strategy:** System role instructs the model to output JSON-only. Sends scrubbed PII-free resume text with an explicit schema example. Falls back to safe empty defaults on parse errors.

---

## 🚀 Deployment

### Backend — AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialise EB application
cd backend
eb init talent-pool --platform node.js --region us-east-1

# Create environment with environment variables
eb create talent-pool-prod \
  --envvars SUPABASE_URL=...,SUPABASE_ANON_KEY=...,OPENROUTER_API_KEY=...,AWS_ACCESS_KEY_ID=...,AWS_SECRET_ACCESS_KEY=...,S3_BUCKET_NAME=...,AWS_REGION=...

# Deploy
eb deploy
```

### Frontend — S3 + CloudFront (or Vercel/Netlify)

```bash
cd frontend
npm run build
# Upload dist/ to S3, configure CloudFront distribution
# OR: connect repo to Vercel/Netlify for one-click deploy
```

> Set the environment variable `VITE_API_URL` to your deployed backend URL before building.
