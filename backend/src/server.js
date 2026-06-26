require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const uploadRoutes = require('./routes/upload');
const candidatesRoutes = require('./routes/candidates');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api', uploadRoutes);
app.use('/api', candidatesRoutes);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Talent Pool backend running on http://localhost:${PORT}`);
});

module.exports = app;
