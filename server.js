const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'polyglotte-secret-change-in-prod-2025';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

// ─── DB ───────────────────────────────────────────────────────────────────────
const db = new Database(process.env.DB_PATH || './polyglotte.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password_hash TEXT,
    google_id TEXT UNIQUE,
    display_name TEXT,
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    lang TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    xp INTEGER DEFAULT 0,
    accuracy REAL DEFAULT 0,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lang, lesson_id)
  );

  CREATE TABLE IF NOT EXISTS user_stats (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    total_xp INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 1,
    last_activity DATE,
    level_ru TEXT DEFAULT 'A1',
    level_fa TEXT DEFAULT 'A1',
    level_he TEXT DEFAULT 'A1',
    level_ar TEXT DEFAULT 'A1',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Inject Google Client ID into index.html at runtime
app.get('/', (req, res) => {
  const fs = require('fs');
  let html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
  html = html.replace('</head>', `<script>window.GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID}";</script></head>`);
  res.send(html);
});

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
function authRequired(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Non authentifié' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide' });
  }
}

function makeToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username || user.display_name, email: user.email },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

function setTokenCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 3600 * 1000
  });
}

function ensureStats(userId) {
  db.prepare('INSERT OR IGNORE INTO user_stats(user_id) VALUES(?)').run(userId);
}

// ─── AUTH ROUTES ──────────────────────────────────────────────────────────────

// Register email/password
app.post('/api/auth/register', (req, res) => {
  const { username, email, password, display_name } = req.body;
  if (!username || !password || !email) return res.status(400).json({ error: 'Champs requis manquants' });
  if (password.length < 6) return res.status(400).json({ error: 'Mot de passe trop court (6 caractères min)' });
  try {
    const hash = bcrypt.hashSync(password, 10);
    const result = db.prepare(
      'INSERT INTO users(username,email,password_hash,display_name) VALUES(?,?,?,?)'
    ).run(username, email, hash, display_name || username);
    ensureStats(result.lastInsertRowid);
    const user = db.prepare('SELECT * FROM users WHERE id=?').get(result.lastInsertRowid);
    const token = makeToken(user);
    setTokenCookie(res, token);
    res.json({ token, user: { id: user.id, username: user.username, display_name: user.display_name, email: user.email } });
  } catch (e) {
    if (e.message.includes('UNIQUE')) res.status(409).json({ error: 'Nom d\'utilisateur ou email déjà pris' });
    else res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Login email/password
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username=? OR email=?').get(identifier, identifier);
  if (!user || !user.password_hash) return res.status(401).json({ error: 'Identifiants incorrects' });
  if (!bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ error: 'Identifiants incorrects' });
  ensureStats(user.id);
  const token = makeToken(user);
  setTokenCookie(res, token);
  res.json({ token, user: { id: user.id, username: user.username, display_name: user.display_name, email: user.email } });
});

// Google OAuth (frontend sends decoded payload)
app.post('/api/auth/google', async (req, res) => {
  const { google_id, email, display_name, avatar } = req.body;
  if (!google_id || !email) return res.status(400).json({ error: 'Données Google manquantes' });
  try {
    let user = db.prepare('SELECT * FROM users WHERE google_id=? OR email=?').get(google_id, email);
    if (!user) {
      const r = db.prepare('INSERT INTO users(google_id,email,display_name,avatar) VALUES(?,?,?,?)').run(google_id, email, display_name, avatar);
      user = db.prepare('SELECT * FROM users WHERE id=?').get(r.lastInsertRowid);
    } else if (!user.google_id) {
      db.prepare('UPDATE users SET google_id=?,avatar=? WHERE id=?').run(google_id, avatar, user.id);
    }
    ensureStats(user.id);
    const token = makeToken(user);
    setTokenCookie(res, token);
    res.json({ token, user: { id: user.id, username: user.username, display_name: user.display_name || display_name, email: user.email } });
  } catch (e) {
    res.status(500).json({ error: 'Erreur Google auth: ' + e.message });
  }
});

// Guest
app.post('/api/auth/guest', (req, res) => {
  const guestName = 'Invité_' + Math.random().toString(36).slice(2, 7);
  const r = db.prepare('INSERT INTO users(username,display_name) VALUES(?,?)').run(guestName, guestName);
  ensureStats(r.lastInsertRowid);
  const user = db.prepare('SELECT * FROM users WHERE id=?').get(r.lastInsertRowid);
  const token = makeToken(user);
  setTokenCookie(res, token);
  res.json({ token, user: { id: user.id, username: user.username, display_name: user.display_name } });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

// Me
app.get('/api/auth/me', authRequired, (req, res) => {
  const user = db.prepare('SELECT id,username,display_name,email,avatar FROM users WHERE id=?').get(req.user.id);
  const stats = db.prepare('SELECT * FROM user_stats WHERE user_id=?').get(req.user.id);
  res.json({ user, stats });
});

// ─── PROGRESS ROUTES ──────────────────────────────────────────────────────────

// Complete a lesson
app.post('/api/progress/complete', authRequired, (req, res) => {
  const { lang, lesson_id, xp, accuracy } = req.body;
  if (!lang || !lesson_id) return res.status(400).json({ error: 'lang et lesson_id requis' });

  db.prepare(`
    INSERT INTO progress(user_id,lang,lesson_id,xp,accuracy)
    VALUES(?,?,?,?,?)
    ON CONFLICT(user_id,lang,lesson_id) DO UPDATE SET
      xp=MAX(excluded.xp,xp),
      accuracy=MAX(excluded.accuracy,accuracy),
      completed_at=CURRENT_TIMESTAMP
  `).run(req.user.id, lang, lesson_id, xp || 0, accuracy || 0);

  const totalXp = db.prepare('SELECT COALESCE(SUM(xp),0) as t FROM progress WHERE user_id=?').get(req.user.id).t;
  const today = new Date().toISOString().slice(0, 10);
  const stats = db.prepare('SELECT * FROM user_stats WHERE user_id=?').get(req.user.id);
  let streak = stats?.streak || 1;
  if (stats?.last_activity) {
    const diff = Math.floor((new Date(today) - new Date(stats.last_activity)) / 86400000);
    if (diff === 1) streak++;
    else if (diff > 1) streak = 1;
  }
  db.prepare(
    'UPDATE user_stats SET total_xp=?,streak=?,last_activity=?,updated_at=CURRENT_TIMESTAMP WHERE user_id=?'
  ).run(totalXp, streak, today, req.user.id);

  res.json({ ok: true, total_xp: totalXp, streak });
});

// Progress for a single lang
app.get('/api/progress/:lang', authRequired, (req, res) => {
  const rows = db.prepare('SELECT lesson_id,xp,accuracy,completed_at FROM progress WHERE user_id=? AND lang=?').all(req.user.id, req.params.lang);
  const stats = db.prepare('SELECT * FROM user_stats WHERE user_id=?').get(req.user.id);
  res.json({ completed: rows, stats });
});

// All progress (all langs)
app.get('/api/progress', authRequired, (req, res) => {
  const rows = db.prepare('SELECT lang,lesson_id,xp,accuracy FROM progress WHERE user_id=?').all(req.user.id);
  const stats = db.prepare('SELECT * FROM user_stats WHERE user_id=?').get(req.user.id);
  res.json({ completed: rows, stats });
});

// Update level (adaptive)
app.post('/api/progress/level', authRequired, (req, res) => {
  const { lang, level } = req.body;
  const col = `level_${lang}`;
  const valid = ['level_ru', 'level_fa', 'level_he', 'level_ar'];
  if (!valid.includes(col)) return res.status(400).json({ error: 'Langue invalide' });
  db.prepare(`UPDATE user_stats SET ${col}=? WHERE user_id=?`).run(level, req.user.id);
  res.json({ ok: true });
});

// Leaderboard
app.get('/api/leaderboard', (req, res) => {
  const lang = req.query.lang;
  let rows;
  if (lang) {
    rows = db.prepare(`
      SELECT u.display_name, u.username, u.avatar, COALESCE(SUM(p.xp),0) as xp
      FROM users u
      LEFT JOIN progress p ON p.user_id=u.id AND p.lang=?
      GROUP BY u.id ORDER BY xp DESC LIMIT 20
    `).all(lang);
  } else {
    rows = db.prepare(`
      SELECT u.display_name, u.username, u.avatar,
             COALESCE(s.total_xp,0) as xp, COALESCE(s.streak,1) as streak
      FROM users u
      LEFT JOIN user_stats s ON s.user_id=u.id
      ORDER BY xp DESC LIMIT 20
    `).all();
  }
  res.json(rows);
});

// ─── FALLBACK SPA ─────────────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌍 Polyglotte running → http://localhost:${PORT}`);
  console.log(`   Google Auth: ${GOOGLE_CLIENT_ID ? '✅ configuré' : '⚠️  GOOGLE_CLIENT_ID non défini (optionnel)'}`);
});
