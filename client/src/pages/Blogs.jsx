import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight, FaStar } from 'react-icons/fa';
import staticBlogs from '../data/blogs';

export default function Blogs() {
  const blogPosts = staticBlogs;

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
          Lessons from building software, deploying infrastructure, and working with AI systems.
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
