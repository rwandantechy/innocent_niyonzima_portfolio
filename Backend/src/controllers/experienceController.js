const experienceService = require('../services/experienceService');

exports.getAll = async (req, res, next) => {
  try {
    const publishedOnly = req.publicOnly === true;
    const items = await experienceService.getAll({ publishedOnly });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const publishedOnly = req.publicOnly === true;
    const item = await experienceService.getById(req.params.id, { publishedOnly });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const created = await experienceService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await experienceService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.reorder = async (req, res, next) => {
  try {
    const items = await experienceService.reorder(req.body.orderedIds);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await experienceService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
