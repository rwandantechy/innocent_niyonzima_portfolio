import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight, FaStar } from 'react-icons/fa';
import { useApp } from '../context/AppProvider';

export default function Blogs(){
  const { blogs: blogPosts = [], loadingBlogs } = useApp();

  return (
    <section className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <h2>Blog & Insights</h2>
        <p className="muted" style={{ fontSize: '1.1rem', maxWidth: 700, margin: '16px auto 0' }}>
          Lessons from building software, deploying infrastructure, and working with AI systems—shared openly for developers, students, and founders.
        </p>
      </motion.div>

      {loadingBlogs && <p className="muted">Loading blogs...</p>}
      <div className="blog-grid">
        {blogPosts.map((post, idx) => (
          <motion.article 
            key={post.id}
            className="blog-card card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
          >
            {post.featured && (
              <span className="blog-badge"><FaStar style={{ marginRight: 4 }} /> Featured</span>
            )}
            
            <div className="blog-meta">
              <span>
                <FaCalendar style={{ marginRight: 6 }} />
                {post.date}
              </span>
              <span>
                <FaClock style={{ marginRight: 6 }} />
                {post.readTime}
              </span>
            </div>

            <h3>{post.title}</h3>
            <p className="muted">{post.excerpt}</p>

            <div className="blog-tags">
              {post.tags.map((tag, i) => (
                <span key={i} className="blog-tag">{tag}</span>
              ))}
            </div>

            <span className="blog-link">
              Read More
              <FaArrowRight style={{ marginLeft: 8 }} />
            </span>
          </motion.article>
        ))}
      </div>

      <motion.div 
        className="coming-soon-notice"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="muted">
          📝 More articles coming soon on API operations, incident response, and maintaining reliable systems in production.
        </p>
      </motion.div>
    </section>
  )
}
