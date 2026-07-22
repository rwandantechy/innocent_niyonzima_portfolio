const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');

router.get('/', experienceController.getAll);
router.get('/:id', experienceController.getById);
router.post('/', experienceController.create);
router.put('/reorder', experienceController.reorder);
router.put('/:id', experienceController.update);
router.delete('/:id', experienceController.remove);

module.exports = router;
