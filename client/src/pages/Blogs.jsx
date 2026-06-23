import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight, FaStar } from 'react-icons/fa';
import staticBlogs from '../data/blogs';

export default function Blogs() {
  const blogPosts = staticBlogs;

  return (
    <section className="container page-section">
      <motion.header
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Blog & Insights</h1>
            <p className="muted">
              Notes on building software, running servers, and working with AI.
            </p>
      </motion.header>

      <div className="blog-grid">
        {blogPosts.map((post, idx) => (
          <motion.article
            key={post.id}
            className="blog-card card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
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
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">{tag}</span>
              ))}
            </div>

            <Link to={`/blog/${post.slug}`} className="blog-link">
              Read More
              <FaArrowRight style={{ marginLeft: 8 }} />
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
