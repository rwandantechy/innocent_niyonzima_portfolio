import React from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope, FaLinkedin, FaGithub, FaFileAlt, FaCheckCircle,
} from 'react-icons/fa';
import { RECRUITER_INFO } from '../data/recruiters';
import MetricCounter from '../components/MetricCounter';
import { IMPACT_METRICS } from '../data/metrics';

export default function Recruiters() {
  const { contact, credentials } = RECRUITER_INFO;

  return (
    <section className="container page-section recruiters-page">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>{RECRUITER_INFO.headline}</h1>
        <p className="page-intro">{RECRUITER_INFO.summary}</p>
        <p className="recruiter-role-line gradient-text">{credentials.roleLine}</p>
      </motion.header>

      <div className="recruiter-actions">
        <a href={`mailto:${contact.email}`} className="btn">
          <FaEnvelope style={{ marginRight: 8 }} /> Email
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          <FaLinkedin style={{ marginRight: 8 }} /> LinkedIn
        </a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          <FaGithub style={{ marginRight: 8 }} /> GitHub
        </a>
        <a
          href="/Innocent_Niyonzima_Resume.pdf"
          className="btn btn-secondary"
          download="Innocent_Niyonzima_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFileAlt style={{ marginRight: 8 }} /> Full Resume
        </a>
      </div>

      <motion.div
        className="hero-metrics-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {IMPACT_METRICS.map((m) => (
          <MetricCounter key={m.label} {...m} />
        ))}
      </motion.div>

      <div className="recruiters-grid">
        <motion.section
          className="card page-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
        >
          <h2>Key Achievements</h2>
          <ul className="recruiter-checklist">
            {RECRUITER_INFO.keyAchievements.map((a) => (
              <li key={a}><FaCheckCircle /> {a}</li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className="card page-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
        >
          <h2>Technical Skills</h2>
          <div className="interest-tags">
            {RECRUITER_INFO.topSkills.map((s) => (
              <span key={s} className="interest-tag">{s}</span>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="card page-card recruiters-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
        >
          <h2>Work Authorization</h2>
          <p>{RECRUITER_INFO.workAuthorization}</p>
          <h3 style={{ marginTop: 24 }}>Education</h3>
          <p><strong>{credentials.degree}</strong>, {credentials.school}, {credentials.location}</p>
          <p className="muted">B.Tech Computer Engineering, Marwadi University, India (2024)</p>
        </motion.section>
      </div>
    </section>
  );
}
