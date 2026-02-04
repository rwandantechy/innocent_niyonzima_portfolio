const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const { requireAuth } = require('../middlewares/authMiddleware');

router.get('/', blogsController.getAll);
router.get('/:id', blogsController.getById);
// protected create
router.post('/', requireAuth, blogsController.create);

module.exports = router;
