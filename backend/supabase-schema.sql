-- ============================================================
-- Talent Pool Search — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Main candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact info (extracted via regex from raw text, BEFORE scrubbing)
  name             TEXT,
  email            TEXT,
  phone            TEXT,
  linkedin_url     TEXT,
  github_url       TEXT,

  -- AI-extracted data (from scrubbed text — no PII)
  skills           TEXT[],
  years_experience NUMERIC(4, 1),
  most_recent_title TEXT,
  location         TEXT,

  -- File metadata
  scrubbed_text    TEXT,        -- scrubbed resume text
  s3_key           TEXT,        -- S3 object key for original file
  file_name        TEXT,        -- original filename

  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster skill search
CREATE INDEX IF NOT EXISTS idx_candidates_skills ON candidates USING GIN (skills);

-- Index for experience range queries
CREATE INDEX IF NOT EXISTS idx_candidates_experience ON candidates (years_experience);

-- Index for location search
CREATE INDEX IF NOT EXISTS idx_candidates_location ON candidates (location);

-- Index for ordering by upload time
CREATE INDEX IF NOT EXISTS idx_candidates_created_at ON candidates (created_at DESC);

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- For this assignment, no login required — allow all operations via anon key
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for anon"
  ON candidates
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
