import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGraduationCap, FaAward, FaGlobe, FaLaptopCode, FaCode, FaBrain, FaCompass, FaLightbulb } from 'react-icons/fa';
import { CONTACT_EMAIL, SOCIAL } from '../config/env';
import Timeline from '../components/Timeline';
import SkillsGrid from '../components/SkillsGrid';
import CertificationCard from '../components/CertificationCard';
import InnocentImage from '../assets/images/Innocent.png';
import experiences from '../data/experiences';
import certificates from '../data/certificates';
import {
  IDENTITY,
  STORY_PARAGRAPHS,
  AREAS_OF_INTEREST,
  MISSION,
} from '../data/story';

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
  return (
    <section className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-avatar-wrapper">
              <div className="about-avatar">
                <img src={InnocentImage} alt="Innocent Niyonzima" className="avatar-image" />
              </div>
              <div className="avatar-status">
                <span className="status-dot"></span>
                Open to opportunities
              </div>
            </div>

            <div className="about-hero-text">
              <h1 className="about-title">
                Hi, I'm <span className="gradient-text">Innocent Niyonzima</span>
              </h1>
              <p className="about-subtitle">
                {IDENTITY.tagline}
              </p>
              <p className="about-description">
                {IDENTITY.summary}
              </p>

              <div className="about-contact-links">
                <a 
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="contact-chip"
                >
                  <FaEnvelope />
                  {CONTACT_EMAIL}
                </a>
                <a 
                  href={SOCIAL.LINKEDIN} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-chip"
                >
                  <FaGlobe />
                  LinkedIn
                </a>
                <a 
                  href={SOCIAL.GITHUB} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-chip"
                >
                  <FaGlobe />
                  GitHub
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container about-content">
        {/* Personal Story */}
        <motion.div 
          className="card about-section"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
          transition={{ duration: 0.45 }}
          style={{ opacity: 1 }}
        >
          <div className="section-header">
            <FaCompass className="section-icon" />
            <h3>My Journey</h3>
          </div>
          <div className="story-paragraphs">
            {STORY_PARAGRAPHS.map((paragraph, idx) => (
              <p key={idx} className="story-paragraph">{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div 
          className="mission-block"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
          transition={{ duration: 0.45 }}
          style={{ opacity: 1 }}
        >
          <FaLightbulb className="mission-icon" />
          <p className="mission-statement">{MISSION.statement}</p>
        </motion.div>

        {/* Education */}
        <motion.div 
          className="card about-section"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
          transition={{ duration: 0.45 }}
          style={{ opacity: 1 }}
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
                <h4>Master of Science in Computer Science</h4>
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
                <h4>Bachelor of Technology in Computer Engineering</h4>
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
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
          transition={{ duration: 0.45 }}
          style={{ opacity: 1 }}
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
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
          transition={{ duration: 0.45 }}
          style={{ opacity: 1 }}
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
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
          transition={{ duration: 0.45 }}
          style={{ opacity: 1 }}
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
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
            transition={{ duration: 0.45 }}
            style={{ opacity: 1 }}
          >
            <div className="section-header">
              <FaLaptopCode className="section-icon" />
              <h4>Areas of Interest</h4>
            </div>
            <div className="interest-tags">
              {AREAS_OF_INTEREST.map((interest) => (
                <span key={interest} className="interest-tag">{interest}</span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="card about-section"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: '120px 0px' }}
            transition={{ duration: 0.45 }}
            style={{ opacity: 1 }}
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
