import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaLaptopCode, FaRocket, FaArrowRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import Hero from '../components/Hero';
import { detailedProjects } from '../data/detailedProjects';
import { Link } from 'react-router-dom';

export default function Home(){
  const featuredProjects = detailedProjects.filter(p => p.featured).slice(0, 3);
  const [highlightsRef, highlightsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Hero />
      
      {/* Quick Highlights Section */}
      <section ref={highlightsRef} className="container" style={{paddingTop:80,paddingBottom:80}}>
        <div className="highlights-grid">
          <motion.div 
            className="highlight-card"
            initial={{ opacity: 0, y: 50 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0 }}
            whileHover={{ y: -12, transition: { duration: 0.3 } }}
          >
            <FaLaptopCode className="highlight-icon" style={{ fontSize: '3.5rem', color: 'var(--color-primary)' }} />
            <h3>Technical Expertise</h3>
            <p className="muted">
              Specializing in MERN, .NET Core, and modern web technologies
            </p>
          </motion.div>
          
          <motion.div 
            className="highlight-card"
            initial={{ opacity: 0, y: 50 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -12, transition: { duration: 0.3 } }}
          >
            <FaRocket className="highlight-icon" style={{ fontSize: '3.5rem', color: 'var(--color-secondary)' }} />
            <h3>Production-Ready Solutions</h3>
            <p className="muted">
              Delivering robust backend systems and optimized databases for 40K+ active users
            </p>
          </motion.div>
          
          <motion.div 
            className="highlight-card"
            initial={{ opacity: 0, y: 50 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -12, transition: { duration: 0.3 } }}
          >
            <FaRocket className="highlight-icon" style={{ fontSize: '3.5rem', color: 'var(--color-accent)' }} />
            <h3>Real-World Impact</h3>
            <p className="muted">
              Projects serving 40K+ users with proven metrics: +25% pass rates, -20% downtime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section ref={projectsRef} className="container" style={{paddingBottom:80}}>
        <motion.div 
          style={{textAlign:'center',marginBottom:48}}
          initial={{ opacity: 0, y: 30 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Featured Work</h2>
          <p className="muted" style={{fontSize:'1.1rem'}}>Recent projects with measurable impact</p>
        </motion.div>
        
        <div className="featured-projects-preview">
          {featuredProjects.map((project, idx) => (
            <motion.div 
              key={project.id} 
              className="card featured-project-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={projectsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
            >
              <h3>{project.title}</h3>
              <p className="muted">{project.description}</p>
              
              <div className="featured-metrics">
                {project.metrics.slice(0, 2).map((metric, idx) => (
                  <motion.div 
                    key={idx} 
                    className="featured-metric"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="metric-value gradient-text">{metric.value}</span>
                    <span className="metric-label muted">{metric.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          style={{textAlign:'center',marginTop:48}}
          initial={{ opacity: 0 }}
          animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/projects" className="btn">
            View All Projects
            <FaArrowRight style={{ marginLeft: 8 }} />
          </Link>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="gradient-text">Let's Build Something Amazing Together</h2>
            <p className="muted" style={{fontSize:'1.1rem',marginBottom:32}}>
              Open to full-stack development roles, backend engineering positions, and technical leadership opportunities
            </p>
            <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
              <Link to="/contact" className="btn">Get In Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
