const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

const markPublic = (req, _res, next) => {
  req.publicOnly = true;
  next();
};

router.get('/', markPublic, skillsController.getAll);

module.exports = router;
