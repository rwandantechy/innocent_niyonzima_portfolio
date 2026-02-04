const blogsService = require('../services/blogsService');

exports.getAll = async (req, res, next) => {
  try {
    const items = await blogsService.getAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await blogsService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const payload = req.body;
    // attach author from token if available
    if (req.user) payload.authorId = req.user.id;
    const created = await blogsService.create(payload);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};
