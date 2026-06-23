import React from 'react';
import { motion } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';
import { CURRENTLY_ITEMS } from '../data/currently';

export default function CurrentlySection({ compact = false }) {
  return (
    <section className={`currently-section ${compact ? 'currently-section--compact' : ''}`}>
      <h3 className="currently-heading">Currently</h3>
      <ul className="currently-list">
        {CURRENTLY_ITEMS.map((item, idx) => (
          <motion.li
            key={item.label}
            className="currently-item"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <FaCircle className="currently-dot" />
            <div>
              <strong>{item.label}</strong>
              {!compact && item.detail && <p className="muted">{item.detail}</p>}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
