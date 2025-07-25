const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure postgres connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function ensureTable() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )`);
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).send('Missing fields');
  }
  const hash = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users(email, username, password) VALUES($1,$2,$3)', [email, username, hash]);
    res.redirect('/login.html');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Missing credentials');
  }
  try {
    const result = await pool.query('SELECT password FROM users WHERE email=$1', [email]);
    if (result.rowCount === 0) return res.status(401).send('Invalid credentials');
    const match = await bcrypt.compare(password, result.rows[0].password);
    if (match) {
      res.send('Logged in');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).send('Error logging in');
  }
});

function openBrowser(url) {
  const startCommand = process.platform === 'darwin'
    ? 'open'
    : process.platform === 'win32'
    ? 'start'
    : 'xdg-open';
  exec(`${startCommand} ${url}`);
}

app.listen(PORT, async () => {
  await ensureTable();
  const url = `http://localhost:${PORT}/login.html`;
  console.log(`Server running on ${url}`);
  openBrowser(url);
});
