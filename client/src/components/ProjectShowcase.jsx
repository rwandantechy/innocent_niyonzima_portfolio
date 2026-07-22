import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaStar, FaBookOpen } from 'react-icons/fa';
import { getCaseStudy } from '../data/caseStudies';

const PROJECT_SLUGS = {
  '1': 'ibyapa',
  '2': 'ai-server',
  '3': 'yigse',
};

export default function ProjectShowcase({ project }) {
  const keyPoints = [...(project.challenges || []), ...(project.results || [])].slice(0, 3);
  const projectSlug = PROJECT_SLUGS[project.id] || project.id;
  const caseStudy = getCaseStudy(projectSlug);
  const liveUrl = project.links?.live;
  const githubUrl = project.links?.github;
  const hasActions = Boolean(caseStudy || liveUrl || githubUrl);
  const metrics = (project.metrics || []).slice(0, 3);

  return (
    <article className="project-showcase card">
      <div className="project-showcase-header">
        <div className="project-header-content">
          <div className="project-title-content">
            <h3 className="project-title">{project.title}</h3>
            {project.featured && (
              <span className="featured-badge-inline">
                <FaStar />
                Featured
              </span>
            )}
          </div>
        </div>
        <p className="project-description">{project.description}</p>
      </div>

      {metrics.length > 0 && (
        <div className={`project-metrics-grid metrics-count-${metrics.length}`}>
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <div className="metric-content">
                <span className="metric-value-large gradient-text">{metric.value}</span>
                <span className="metric-label-large">{metric.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {project.tech && project.tech.length > 0 && (
        <div className="project-tech-section">
          <h4 className="section-label">Tech Stack</h4>
          <div className="tech-stack-modern">
            {project.tech.map((tech) => (
              <span key={tech} className="tech-badge-modern">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {keyPoints.length > 0 && (
        <div className="project-summary-list">
          <h4 className="section-label">Key Points</h4>
          <ul className="detail-list">
            {keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {hasActions && (
        <div className="project-actions">
          {caseStudy && (
            <Link to={`/projects/${projectSlug}`} className="btn">
              <FaBookOpen />
              Case Study
            </Link>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              className="btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              View Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt />
              Live Demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}
