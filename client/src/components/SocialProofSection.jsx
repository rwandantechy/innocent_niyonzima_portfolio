import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { TESTIMONIALS, FEATURED_IN } from '../data/socialProof';

export default function SocialProofSection({ showFeatured = true }) {
  return (
    <div className="social-proof-wrap">
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, idx) => (
          <motion.blockquote
            key={t.name}
            className="testimonial-card card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <FaQuoteLeft className="testimonial-icon" />
            <p>{t.quote}</p>
            <footer>
              <strong>{t.name}</strong>
              <span className="muted">{t.role}, {t.org}</span>
            </footer>
          </motion.blockquote>
        ))}
      </div>

      {showFeatured && (
        <div className="featured-in-section">
          <h4>Featured In & Memberships</h4>
          <div className="featured-in-grid">
            {FEATURED_IN.map((item) => (
              <span key={item.name} className="featured-in-badge">
                {item.name}
                <small className="muted">{item.type}</small>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
