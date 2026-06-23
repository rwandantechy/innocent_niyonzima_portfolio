import React from 'react';
import { motion } from 'framer-motion';
import { USES_CATEGORIES } from '../data/uses';

export default function Uses() {
  return (
    <section className="container page-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Uses</h1>
        <p className="page-intro muted">
          Hardware and software I use day to day. Inspired by <a href="https://uses.tech" target="_blank" rel="noopener noreferrer">/uses</a> pages.
        </p>
      </motion.div>

      <div className="uses-grid">
        {USES_CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.title}
            className="card page-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <h3>{cat.title}</h3>
            <ul className="purpose-list">
              {cat.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
