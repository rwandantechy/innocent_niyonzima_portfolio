const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const projectRoutes = require('./projects');
const blogRoutes = require('./blogs');
const skillRoutes = require('./skills');
const experienceRoutes = require('./experience');

const adminProjects = require('./adminProjects');
const adminBlogs = require('./adminBlogs');
const adminSkills = require('./adminSkills');
const adminExperience = require('./adminExperience');

router.use('/auth', authRoutes);

// Public read APIs (published only)
router.use('/projects', projectRoutes);
router.use('/blogs', blogRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);

// Admin APIs (all docs + mutations)
router.use('/admin/projects', adminProjects);
router.use('/admin/blogs', adminBlogs);
router.use('/admin/skills', adminSkills);
router.use('/admin/experience', adminExperience);

module.exports = router;
