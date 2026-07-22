import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ProjectShowcase from '../components/ProjectShowcase';
import { useApp } from '../context/AppProvider';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const { projects: sourceProjects = [], loadingProjects } = useApp();

  const filteredProjects = filter === 'all'
    ? sourceProjects
    : sourceProjects.filter((p) => p.featured);

  return (
    <section className="container page-section">
      <div className="projects-header page-header">
        <h2 className="gradient-text">Featured Projects</h2>
        <p className="muted projects-subtitle">
          Real projects with real users and long-form write-ups.
        </p>

        <div className="project-filters-wrapper">
          <div className="project-filters">
            <button
              type="button"
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Projects ({sourceProjects.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
              onClick={() => setFilter('featured')}
            >
              <FaStar style={{ marginRight: 6 }} /> Featured ({sourceProjects.filter((p) => p.featured).length})
            </button>
          </div>
        </div>
      </div>

      <div className="projects-showcase-grid">
        {loadingProjects && <p>Loading projects...</p>}
        {filteredProjects.map((project) => (
          <ProjectShowcase key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="projects-empty-state">
          <p className="muted">No projects found with the selected filter.</p>
        </div>
      )}
    </section>
  );
}
