import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaBookOpen } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { getCaseStudy } from '../data/caseStudies';

const PROJECT_SLUGS = {
  '1': 'ibyapa',
  '2': 'ai-server',
  '3': 'yigse',
};

export default function ProjectShowcase({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const keyPoints = [...(project.challenges || []), ...(project.results || [])].slice(0, 3);
  const projectSlug = PROJECT_SLUGS[project.id] || project.id;
  const caseStudy = getCaseStudy(projectSlug);
  const liveUrl = project.links?.live;
  const githubUrl = project.links?.github;
  const hasActions = Boolean(caseStudy || liveUrl || githubUrl);
  const metrics = (project.metrics || []).slice(0, 3);

  return (
    <motion.article 
      ref={ref}
      className="project-showcase card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="project-showcase-header">
        <div className="project-header-content">
          <div className="project-title-content">
            <h3 className="project-title">{project.title}</h3>
            {project.featured && (
              <motion.span 
                className="featured-badge-inline"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <FaStar />
                Featured
              </motion.span>
            )}
          </div>
        </div>
        <p className="project-description">{project.description}</p>
      </div>

      {metrics.length > 0 && (
        <div className={`project-metrics-grid metrics-count-${metrics.length}`}>
          {metrics.map((metric, idx) => (
            <motion.div 
              key={idx} 
              className="metric-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="metric-content">
                <span className="metric-value-large gradient-text">{metric.value}</span>
                <span className="metric-label-large">{metric.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {project.tech && project.tech.length > 0 && (
        <div className="project-tech-section">
          <h4 className="section-label">Tech Stack</h4>
          <div className="tech-stack-modern">
            {project.tech.map((tech, idx) => (
              <motion.span 
                key={idx} 
                className="tech-badge-modern"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {keyPoints.length > 0 && (
        <div className="project-summary-list">
          <h4 className="section-label">Key Points</h4>
          <ul className="detail-list">
            {keyPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {hasActions && (
        <motion.div className="project-actions">
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
        </motion.div>
      )}
    </motion.article>
  );
}
