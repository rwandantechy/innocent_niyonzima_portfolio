import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppProvider';
import { MISSION, SITE_PURPOSES } from '../data/story';

export default function Home(){
  const { projects = [], loadingProjects } = useApp();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Hero />

      {/* Mission Preview */}
      <section className="home-story-section">
        <div className="container">
          <motion.div
            className="home-story-content card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="home-story-lead">{MISSION.statement}</p>
            <p className="muted home-story-sub">{MISSION.belief}</p>
            <ul className="home-purpose-list">
              {SITE_PURPOSES.slice(0, 2).map((purpose) => (
                <li key={purpose}>{purpose}</li>
              ))}
            </ul>
            <Link to="/about" className="btn btn-secondary" style={{ marginTop: 24 }}>
              Read My Full Story
              <FaArrowRight style={{ marginLeft: 8 }} />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Projects Preview */}
      <section ref={projectsRef} className="container" style={{paddingTop:40,paddingBottom:80}}>
        <motion.div 
          style={{textAlign:'center',marginBottom:48}}
          initial={{ opacity: 0, y: 30 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Featured Work</h2>
          <p className="muted" style={{fontSize:'1.1rem'}}>A few projects I have worked on recently.</p>
        </motion.div>
        
        {loadingProjects && <p className="muted">Loading projects...</p>}
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
            <h2 className="gradient-text">Want to work together?</h2>
            <p className="muted" style={{fontSize:'1.1rem',marginBottom:32}}>
              I build useful technology, share knowledge openly, and create systems that make a meaningful impact.
            </p>
            <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
              <Link to="/contact" className="btn">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
