const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

const markPublic = (req, _res, next) => {
  req.publicOnly = true;
  next();
};

router.get('/', markPublic, projectsController.getAll);
router.get('/:id', markPublic, projectsController.getById);

module.exports = router;
