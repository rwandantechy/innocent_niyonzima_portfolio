import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogs';

export default function Blogs(){

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
          Sharing insights on full-stack development, best practices, and technical innovations
        </p>
      </motion.div>

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
              <span className="blog-badge">⭐ Featured</span>
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

            <Link to={`/blogs/${post.id}`} className="blog-link">
              Read More
              <FaArrowRight style={{ marginLeft: 8 }} />
            </Link>
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
          📝 More articles coming soon! Stay tuned for deep dives into full-stack development,
          system design, and best practices in modern web technologies.
        </p>
      </motion.div>
    </section>
  )
}
