const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

function openBrowser(url) {
  const startCommand = process.platform === 'darwin'
    ? 'open'
    : process.platform === 'win32'
    ? 'start'
    : 'xdg-open';
  exec(`${startCommand} ${url}`);
}

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/login.html`;
  console.log(`Server running on ${url}`);
  openBrowser(url);
});
