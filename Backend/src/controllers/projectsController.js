const projectsService = require('../services/projectsService');

exports.getAll = async (req, res, next) => {
  try {
    const items = await projectsService.getAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await projectsService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const created = await projectsService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};
