import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGraduationCap, FaAward, FaGlobe, FaLaptopCode, FaCode, FaBrain } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import Timeline from '../components/Timeline';
import SkillsGrid from '../components/SkillsGrid';
import CertificationCard from '../components/CertificationCard';
import InnocentImage from '../assets/images/Innocent.png';
import experiences from '../data/experiences';
import certificates from '../data/certificates';

export default function About(){
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const quickStats = [
    { icon: <FaGraduationCap />, value: '2', label: 'Degrees' },
    { icon: <FaCode />, value: '10+', label: 'Projects' },
    { icon: <FaAward />, value: '17', label: 'Certifications' },
    { icon: <FaBrain />, value: '3+', label: 'Years Experience' }
  ];

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
                Full-Stack Developer | Backend Engineer | Tech Innovator
              </p>
              <p className="about-description">
                Passionate about building scalable applications and solving complex technical challenges with modern technologies.
                Specialized in MERN stack, .NET Core, and cloud infrastructure. Always eager to learn and tackle new technical problems.
              </p>

              <div className="about-contact-links">
                <motion.a 
                  href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'contact@example.com'}`}
                  className="contact-chip"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <FaEnvelope />
                  {import.meta.env.VITE_CONTACT_EMAIL || 'contact@example.com'}
                </motion.a>
                <motion.a 
                  href={import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com'} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-chip"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <FaGlobe />
                  LinkedIn
                </motion.a>
                <motion.a 
                  href={import.meta.env.VITE_GITHUB_URL || 'https://github.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-chip"
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <FaGlobe />
                  linktr.ee
                </motion.a>
              </div>

              <div className="about-social-links">
                <motion.a 
                  href={import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link-btn"
                  whileHover={{ y: -4 }}
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a 
                  href={import.meta.env.VITE_GITHUB_URL || 'https://github.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link-btn"
                  whileHover={{ y: -4 }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a 
                  href={import.meta.env.VITE_TWITTER_URL || 'https://twitter.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link-btn"
                  whileHover={{ y: -4 }}
                >
                  <FaMapMarkerAlt />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="container">
        <motion.div 
          ref={statsRef}
          className="about-stats-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {quickStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className="about-stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <div className="stat-icon-large">{stat.icon}</div>
              <div className="stat-value-xl gradient-text">{stat.value}</div>
              <div className="stat-label-xl">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

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
              <span className="interest-tag">Full-Stack Development</span>
              <span className="interest-tag">Backend Engineering</span>
              <span className="interest-tag">System Design</span>
              <span className="interest-tag">Cloud Technologies</span>
              <span className="interest-tag">Database Optimization</span>
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
