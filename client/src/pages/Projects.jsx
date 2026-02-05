import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaCode, FaStar } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import ProjectShowcase from '../components/ProjectShowcase';
import { detailedProjects } from '../data/detailedProjects';

export default function Projects(){
  const [filter, setFilter] = useState('all');
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const sourceProjects = detailedProjects;
  const filteredProjects = filter === 'all' 
    ? sourceProjects 
    : sourceProjects.filter(p => p.featured);

  const stats = {
    total: detailedProjects.length,
    featured: detailedProjects.filter(p => p.featured).length,
    technologies: [...new Set(detailedProjects.flatMap(p => p.tech || []))].length,
    users: '40K+'
  };

  return (
    <section className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
      {/* Header Section */}
      <motion.div 
        ref={headerRef}
        className="projects-header"
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          className="muted projects-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A curated collection of projects demonstrating full-stack development, system design, and real-world impact
        </motion.p>

        {/* Stats Grid */}
        <motion.div 
          className="projects-stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="stat-card"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <FaCode className="stat-icon" />
            <div className="stat-value gradient-text">{stats.total}</div>
            <div className="stat-label">Projects</div>
          </motion.div>
          <motion.div 
            className="stat-card"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <FaStar className="stat-icon" />
            <div className="stat-value gradient-text">{stats.featured}</div>
            <div className="stat-label">Featured</div>
          </motion.div>
          <motion.div 
            className="stat-card"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <span className="stat-icon" style={{ fontSize: '2rem' }}>⚙️</span>
            <div className="stat-value gradient-text">{stats.technologies}</div>
            <div className="stat-label">Technologies</div>
          </motion.div>
          <motion.div 
            className="stat-card"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <span className="stat-icon" style={{ fontSize: '2rem' }}>👥</span>
            <div className="stat-value gradient-text">{stats.users}</div>
            <div className="stat-label">Total Users</div>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="project-filters-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FaFilter className="filter-icon" />
          <div className="project-filters">
            <motion.button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects ({detailedProjects.length})
            </motion.button>
            <motion.button 
              className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
              onClick={() => setFilter('featured')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ⭐ Featured ({detailedProjects.filter(p => p.featured).length})
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Projects Grid */}
      <motion.div 
        className="projects-showcase-grid"
        layout
      >
        {loadingProjects && (<p>Loading projects...</p>)}
        {filteredProjects.map((project, idx) => (
          <ProjectShowcase key={project.id} project={project} index={idx} />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          className="projects-empty-state"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="muted">No projects found with the selected filter.</p>
        </motion.div>
      )}
    </section>
  );
}