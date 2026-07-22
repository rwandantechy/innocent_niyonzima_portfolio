const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

router.get('/', skillsController.getAll);
router.post('/', skillsController.create);
router.put('/:id', skillsController.update);
router.delete('/:id', skillsController.remove);

module.exports = router;
