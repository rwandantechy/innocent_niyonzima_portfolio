const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getById);
router.post('/', projectsController.create);

module.exports = router;
