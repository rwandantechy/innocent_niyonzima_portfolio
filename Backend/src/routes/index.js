const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const projectRoutes = require('./projects');
const blogRoutes = require('./blogs');
const cmsRoutes = require('./cms');

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/blogs', blogRoutes);
router.use('/cms', cmsRoutes);

module.exports = router;
