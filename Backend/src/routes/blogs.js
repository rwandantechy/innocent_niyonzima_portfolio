const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

const markPublic = (req, _res, next) => {
  req.publicOnly = true;
  next();
};

router.get('/', markPublic, blogsController.getAll);
router.get('/:id', markPublic, blogsController.getById);

module.exports = router;
