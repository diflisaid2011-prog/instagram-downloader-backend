const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/extract', (req, res) => {
  const { url } = req.body;

  if (!url || !url.includes('instagram.com')) {
    return res.status(400).json({ error: 'رابط غير صالح' });
  }

  const cmd = `yt-dlp -g --no-playlist "${url}"`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: 'تعذر استخراج الفيديو' });
    }
    const directUrl = stdout.trim().split('\n')[0];
    res.json({ downloadUrl: directUrl });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
