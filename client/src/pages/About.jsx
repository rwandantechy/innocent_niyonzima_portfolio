import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaAward, FaGlobe, FaLaptopCode, FaCode, FaBrain } from 'react-icons/fa';
import { CONTACT_EMAIL, SOCIAL } from '../config/env';
import { useInView } from 'react-intersection-observer';
import Timeline from '../components/Timeline';
import SkillsGrid from '../components/SkillsGrid';
import CertificationCard from '../components/CertificationCard';
import InnocentImage from '../assets/images/Innocent.png';
import experiences from '../data/experiences';
import certificates from '../data/certificates';

const fallbackLogo = (label = 'NA') => {
  const initials = label
    .split(' ')
    .map((part) => part[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='100%' height='100%' rx='10' fill='%231f2937'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23f8fafc'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export default function About(){
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="about-page">
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="about-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="about-hero-content">
            <motion.div 
              className="about-avatar-wrapper"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="about-avatar">
                <img src={InnocentImage} alt="Innocent Niyonzima" className="avatar-image" />
              </div>
              <motion.div 
                className="avatar-status"
                initial={{ opacity: 0, x: -20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="status-dot"></span>
                Open to opportunities
              </motion.div>
            </motion.div>

            <motion.div 
              className="about-hero-text"
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="about-title">
                Hi, I'm <span className="gradient-text">Innocent Niyonzima</span>
              </h1>
              <p className="about-subtitle">
                Backend Engineer focused on production systems, reliability, and deployment
              </p>
              <p className="about-description">
                I build and maintain backend services used in real environments.
                Most of my work is around APIs, debugging production issues, Linux servers, and reliable deployments.
              </p>

              <div className="about-contact-links">
                <motion.a 
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="contact-chip"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <FaEnvelope />
                  {CONTACT_EMAIL}
                </motion.a>
                <motion.a 
                  href={SOCIAL.LINKEDIN} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-chip"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <FaGlobe />
                  LinkedIn
                </motion.a>
                <motion.a 
                  href={SOCIAL.GITHUB} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-chip"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <FaGlobe />
                  GitHub
                </motion.a>
              </div>

            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container about-content">
        {/* Education */}
        <motion.div 
          className="card about-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <FaGraduationCap className="section-icon" />
            <h3>Education</h3>
          </div>
          <div className="education-grid">
            <motion.div 
              className="education-item"
              whileHover={{ x: 8 }}
            >
              <img 
                src="https://legacywww.catholic.edu/assets/images/CUA-Logo-Large.png" 
                alt="The Catholic University of America" 
                className="education-logo"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = fallbackLogo('CUA');
                }}
              />
              <div className="education-content">
                <h4>Master of Science – Computer Science</h4>
                <p className="education-school">The Catholic University of America</p>
                <p className="education-location">Washington, DC</p>
                <span className="education-date">May 2026</span>
              </div>
            </motion.div>
            <motion.div 
              className="education-item"
              whileHover={{ x: 8 }}
            >
              <img 
                src="https://www.marwadiuniversity.ac.in/wp-content/themes/marwadi-university/assets/img/logomain.svg" 
                alt="Marwadi University" 
                className="education-logo"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = fallbackLogo('MU');
                }}
              />
              <div className="education-content">
                <h4>Bachelor of Technology – Computer Engineering</h4>
                <p className="education-school">Marwadi University</p>
                <p className="education-location">Rajkot, Gujarat, India</p>
                <span className="education-date">April 2024</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Skills */}
        <motion.div 
          className="card about-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <FaCode className="section-icon" />
            <h3>Technical Skills</h3>
          </div>
          <SkillsGrid />
        </motion.div>

        {/* Experience */}
        <motion.div 
          className="card about-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <FaBrain className="section-icon" />
            <h3>Research & Experience</h3>
          </div>
          <Timeline items={experiences} />
        </motion.div>

        {/* Certifications */}
        <motion.div 
          className="card about-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <FaAward className="section-icon" />
            <h3>Certifications & Professional Development</h3>
          </div>
          <div className="certifications-grid">
            {certificates.map((cert, idx) => (
              <CertificationCard
                key={cert.certificateUrl}
                {...cert}
                index={idx}
              />
            ))}
          </div>
        </motion.div>

        {/* Additional Info Grid */}
        <div className="about-info-grid">
          <motion.div 
            className="card about-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-header">
              <FaLaptopCode className="section-icon" />
              <h4>Technical Interests</h4>
            </div>
            <div className="interest-tags">
              <span className="interest-tag">Backend Engineering</span>
              <span className="interest-tag">System Design</span>
              <span className="interest-tag">Production Reliability</span>
              <span className="interest-tag">Debugging & Incident Response</span>
              <span className="interest-tag">Deployment Operations</span>
            </div>
          </motion.div>

          <motion.div 
            className="card about-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="section-header">
              <FaGlobe className="section-icon" />
              <h4>Languages</h4>
            </div>
            <div className="languages-list">
              <div className="language-item">
                <span className="language-name">English</span>
                <span className="language-level">Fluent</span>
              </div>
              <div className="language-item">
                <span className="language-name">Kinyarwanda</span>
                <span className="language-level">Native</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
