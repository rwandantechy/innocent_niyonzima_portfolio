import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { NOW_PAGE } from '../data/currently';
import CurrentlySection from '../components/CurrentlySection';

export default function Now() {
  return (
    <section className="container page-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="muted page-updated">Last updated: {NOW_PAGE.lastUpdated}</p>
        <h1>Now</h1>
        <p className="page-intro muted">{NOW_PAGE.intro}</p>
      </motion.div>

      <motion.div
        className="card page-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3>Currently focused on</h3>
        <ul className="purpose-list">
          {NOW_PAGE.focus.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </motion.div>

      <CurrentlySection />

      <motion.div
        className="card page-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3>Not focused on</h3>
        <ul className="purpose-list">
          {NOW_PAGE.notFocused.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </motion.div>

      <div style={{ marginTop: 32 }}>
        <Link to="/about" className="btn btn-secondary">
          Read my full story <FaArrowRight style={{ marginLeft: 8 }} />
        </Link>
      </div>
    </section>
  );
}
