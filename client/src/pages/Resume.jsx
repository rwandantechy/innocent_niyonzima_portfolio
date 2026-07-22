import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaDownload, FaBriefcase } from 'react-icons/fa';
import Timeline from '../components/Timeline';
import SkillsGrid from '../components/SkillsGrid';
import CertificationCard from '../components/CertificationCard';
import experiences from '../data/experiences';
import certificates from '../data/certificates';
import { CREDENTIALS } from '../data/metrics';
import { IMPACT_METRICS } from '../data/metrics';

export default function Resume() {
  return (
    <section className="resume-page container page-section">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Resume</h1>
        <p className="page-intro muted">
          {CREDENTIALS.roleLine} - {CREDENTIALS.degree}, {CREDENTIALS.school}
        </p>
        <div className="resume-header-actions">
          <a
            href="/Innocent_Niyonzima_Resume.pdf"
            className="btn"
            download="Innocent_Niyonzima_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDownload style={{ marginRight: 8 }} />
            Download PDF
          </a>
          <Link to="/recruiters" className="btn btn-secondary">
            <FaBriefcase style={{ marginRight: 8 }} />
            Recruiter Summary
          </Link>
        </div>
      </motion.header>

      <motion.div
        className="resume-metrics"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {IMPACT_METRICS.map((m) => (
          <div key={m.label} className="metric-counter-card">
            <span className="metric-counter-value gradient-text">{m.display}</span>
            <span className="metric-counter-label">{m.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="card about-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Experience</h2>
        <Timeline items={experiences} />
      </motion.div>

      <motion.div
        className="card about-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Education</h2>
        <div className="resume-education">
          <div className="resume-edu-item">
            <strong>Master of Science in Computer Science</strong>
            <p className="muted">The Catholic University of America, Washington, DC · May 2026</p>
          </div>
          <div className="resume-edu-item">
            <strong>Bachelor of Technology in Computer Engineering</strong>
            <p className="muted">Marwadi University, Rajkot, India · April 2024</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="card about-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Technical Skills</h2>
        <SkillsGrid />
      </motion.div>

      <motion.div
        className="card about-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Research</h2>
        <p>
          Research assistant building automated benchmarks to compare open-source language models on edge devices with limited resources.
        </p>
      </motion.div>

      <motion.div
        className="card about-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Certifications</h2>
        <div className="certifications-grid">
          {certificates.slice(0, 6).map((cert, idx) => (
            <CertificationCard key={cert.certificateUrl} {...cert} index={idx} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
