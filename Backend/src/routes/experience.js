const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');

const markPublic = (req, _res, next) => {
  req.publicOnly = true;
  next();
};

router.get('/', markPublic, experienceController.getAll);
router.get('/:id', markPublic, experienceController.getById);

module.exports = router;
