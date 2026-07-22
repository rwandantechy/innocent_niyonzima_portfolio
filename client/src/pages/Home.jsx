import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CurrentlySection from '../components/CurrentlySection';
import JourneyTimeline from '../components/JourneyTimeline';
import SocialProofSection from '../components/SocialProofSection';
import GitHubActivity from '../components/GitHubActivity';
import { useApp } from '../context/AppProvider';
import staticBlogs from '../data/blogs';
import { getCaseStudy } from '../data/caseStudies';

export default function Home() {
  const { projects = [], loadingProjects } = useApp();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const recentBlogs = staticBlogs.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="home-currently-wrap">
        <div className="container">
          <CurrentlySection />
        </div>
      </section>

      <section className="home-journey-section">
        <div className="container">
          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>My Journey</h2>
          </motion.div>
          <JourneyTimeline />
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>What people say</h2>
            <p className="muted">Short notes from research, operations, and client work.</p>
          </motion.div>
          <SocialProofSection />
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <GitHubActivity />
        </div>
      </section>

      <section ref={projectsRef} className="content-section">
        <div className="container">
          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Featured Work</h2>
            <p className="muted">
              Production systems with real users and ongoing ownership.
            </p>
          </motion.div>

          {loadingProjects && <p className="muted">Loading projects...</p>}
          <div className="featured-projects-preview">
            {featuredProjects.map((project, idx) => {
              const caseStudy = getCaseStudy(project.id);
              const metrics = caseStudy?.metrics || (
                Array.isArray(project.metrics) ? project.metrics : []
              );
              return (
                <motion.div
                  key={project.id}
                  className="card featured-project-card"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={projectsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  <h3>{project.title}</h3>
                  <p className="muted">{project.description}</p>
                  <div className="featured-metrics">
                    {metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label} className="featured-metric">
                        <span className="metric-value gradient-text">{metric.value}</span>
                        <span className="metric-label muted">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                  {getCaseStudy(project.id) && (
                    <Link to={`/projects/${project.id}`} className="btn btn-secondary" style={{ marginTop: 16, alignSelf: 'flex-start' }}>
                      Read Case Study <FaArrowRight style={{ marginLeft: 8 }} />
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            style={{ textAlign: 'center', marginTop: 'var(--section-spacing)' }}
            initial={{ opacity: 0 }}
            animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/projects" className="btn">
              View All Projects
              <FaArrowRight style={{ marginLeft: 8 }} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Latest Writing</h2>
            <p className="muted">Things I have written about building and running software.</p>
          </motion.div>
          <div className="blog-grid">
            {recentBlogs.map((post, idx) => (
              <motion.article
                key={post.id}
                className="blog-card card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3>{post.title}</h3>
                <p className="muted">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-link">
                  Read Article <FaArrowRight style={{ marginLeft: 8 }} />
                </Link>
              </motion.article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--section-spacing)' }}>
            <Link to="/blogs" className="btn btn-secondary">All Articles</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="gradient-text">Want to work together?</h2>
            <p className="muted" style={{ fontSize: '1.05rem', marginBottom: 32 }}>
              I am looking for software engineering roles. Happy to share more about Ibyapa.com and my other work.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/recruiters" className="btn">For Recruiters</Link>
              <Link to="/contact" className="btn btn-secondary">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
