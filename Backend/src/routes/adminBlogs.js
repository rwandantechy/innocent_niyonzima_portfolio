const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

router.get('/', blogsController.getAll);
router.get('/:id', blogsController.getById);
router.post('/', blogsController.create);
router.put('/:id', blogsController.update);
router.delete('/:id', blogsController.remove);

module.exports = router;
