import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendar, FaClock } from 'react-icons/fa';
import { getBlogBySlug } from '../data/blogs';

function renderContent(content) {
  const blocks = content.split('\n\n');
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('## ')) {
      return <h2 key={i}>{trimmed.slice(3)}</h2>;
    }
    if (trimmed.startsWith('```')) {
      const code = trimmed.replace(/```\w*\n?/, '').replace(/```$/, '');
      return <pre key={i} className="blog-code-block"><code>{code}</code></pre>;
    }
    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter((l) => l.startsWith('- '));
      return (
        <ul key={i} className="case-study-list">
          {items.map((item) => <li key={item}>{item.slice(2)}</li>)}
        </ul>
      );
    }
    const withBold = trimmed.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return <p key={i}>{withBold}</p>;
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) return <Navigate to="/blogs" replace />;

  return (
    <article className="blog-post-page">
      <div className="container page-section page-narrow">
        <Link to="/blogs" className="back-link">
          <FaArrowLeft /> All Articles
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="blog-meta" style={{ marginBottom: 16 }}>
            <span><FaCalendar style={{ marginRight: 6 }} />{post.date}</span>
            <span><FaClock style={{ marginRight: 6 }} />{post.readTime}</span>
          </div>
          <h1>{post.title}</h1>
          <div className="blog-tags" style={{ marginTop: 16 }}>
            {post.tags.map((tag) => <span key={tag} className="blog-tag">{tag}</span>)}
          </div>
        </motion.header>

        <motion.div
          className="blog-post-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {renderContent(post.content)}
        </motion.div>
      </div>
    </article>
  );
}
