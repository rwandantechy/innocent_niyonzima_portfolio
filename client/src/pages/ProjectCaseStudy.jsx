import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { getCaseStudy } from '../data/caseStudies';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  if (!study) return <Navigate to="/projects" replace />;

  return (
    <article className="case-study-page">
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <Link to="/projects" className="back-link">
          <FaArrowLeft /> All Projects
        </Link>

        <motion.header
          className="case-study-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>{study.title}</h1>
          <p className="case-study-tagline muted">{study.tagline}</p>
          {study.liveUrl && (
            <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ marginTop: 16 }}>
              <FaExternalLinkAlt style={{ marginRight: 8 }} />
              Live Site
            </a>
          )}
        </motion.header>

        {study.screenshot && (
          <motion.img
            src={study.screenshot}
            alt={study.title}
            className="case-study-hero-img"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            loading="lazy"
          />
        )}

        <div className="case-study-metrics">
          {study.metrics.map((m) => (
            <div key={m.label} className="metric-counter-card">
              <span className="metric-counter-value gradient-text">{m.value}</span>
              <span className="metric-counter-label">{m.label}</span>
            </div>
          ))}
        </div>

        <div className="case-study-grid">
          <section className="card case-study-section">
            <h2>Problem</h2>
            <p>{study.problem}</p>
          </section>
          <section className="card case-study-section">
            <h2>Solution</h2>
            <p>{study.solution}</p>
          </section>
        </div>

        <section className="card case-study-section">
          <ArchitectureDiagram layers={study.architecture} />
        </section>

        <div className="case-study-grid">
          <section className="card case-study-section">
            <h2>Challenges</h2>
            <ul className="case-study-list">
              {study.challenges.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </section>
          <section className="card case-study-section">
            <h2>Key Decisions</h2>
            <ul className="case-study-list">
              {(study.decisions || []).map((d) => <li key={d}>{d}</li>)}
            </ul>
          </section>
        </div>

        <div className="case-study-grid">
          <section className="card case-study-section">
            <h2>Results</h2>
            <ul className="case-study-list">
              {study.results.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </section>
          <section className="card case-study-section">
            <h2>Lessons Learned</h2>
            <ul className="case-study-list">
              {study.lessons.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </section>
        </div>

        <section className="card case-study-section">
          <h2>Tech Stack</h2>
          <div className="interest-tags">
            {study.tech.map((t) => <span key={t} className="interest-tag">{t}</span>)}
          </div>
        </section>
      </div>
    </article>
  );
}
