const express = require('express');
const router = express.Router();

const CMS_URL = process.env.CMS_URL || 'http://localhost:1337';

// simple proxy helper
async function forward(path, options = {}) {
  const url = `${CMS_URL}${path}`;
  const res = await fetch(url, options);
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

router.get('/projects', async (req, res, next) => {
  try {
    const result = await forward('/api/projects?populate=*');
    return res.status(result.status).json(result.data);
  } catch (err) { next(err); }
});

router.get('/blogs', async (req, res, next) => {
  try {
    const result = await forward('/api/blogs?populate=*');
    return res.status(result.status).json(result.data);
  } catch (err) { next(err); }
});

module.exports = router;
