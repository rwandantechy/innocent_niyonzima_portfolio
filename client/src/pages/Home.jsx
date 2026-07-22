import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CurrentlySection from '../components/CurrentlySection';
import JourneyTimeline from '../components/JourneyTimeline';
import GitHubActivity from '../components/GitHubActivity';
import { useApp } from '../context/AppProvider';
import staticBlogs from '../data/blogs';
import { getCaseStudy } from '../data/caseStudies';

export default function Home() {
  const { projects = [], loadingProjects } = useApp();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
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
          <div className="section-heading">
            <h2>My Journey</h2>
          </div>
          <JourneyTimeline />
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <GitHubActivity />
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="section-heading">
            <h2>Featured Work</h2>
            <p className="muted">
              Production systems with real users and ongoing ownership.
            </p>
          </div>

          {loadingProjects && <p className="muted">Loading projects...</p>}
          <div className="featured-projects-preview">
            {featuredProjects.map((project) => {
              const caseStudy = getCaseStudy(project.id);
              const metrics = caseStudy?.metrics || (
                Array.isArray(project.metrics) ? project.metrics : []
              );
              return (
                <div
                  key={project.id}
                  className="card featured-project-card"
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
                  {caseStudy && (
                    <Link to={`/projects/${project.id}`} className="btn btn-secondary" style={{ marginTop: 16, alignSelf: 'flex-start' }}>
                      Read Case Study <FaArrowRight style={{ marginLeft: 8 }} />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--section-spacing)' }}>
            <Link to="/projects" className="btn btn-primary">
              View All Projects
              <FaArrowRight style={{ marginLeft: 8 }} />
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="section-heading">
            <h2>Latest Writing</h2>
            <p className="muted">Things I have written about building and running software.</p>
          </div>
          <div className="blog-grid">
            {recentBlogs.map((post) => (
              <article
                key={post.id}
                className="blog-card card"
              >
                <h3>{post.title}</h3>
                <p className="muted">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-link">
                  Read Article <FaArrowRight style={{ marginLeft: 8 }} />
                </Link>
              </article>
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
