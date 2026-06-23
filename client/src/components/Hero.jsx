import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaBolt, FaEnvelope, FaGraduationCap } from 'react-icons/fa';
import { IDENTITY } from '../data/story';
import { CREDENTIALS, IMPACT_METRICS } from '../data/metrics';
import MetricCounter from './MetricCounter';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="hero hd-shell hero--dense">
      <div className="container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="hero__title">{IDENTITY.headline}</h1>
          </motion.div>

          <motion.div className="hero-credentials" variants={itemVariants}>
            <span><FaGraduationCap /> {CREDENTIALS.degree}</span>
            <span>{CREDENTIALS.school}</span>
            <span>{CREDENTIALS.location}</span>
          </motion.div>

          <motion.div className="hero-metrics-grid" variants={itemVariants}>
            {IMPACT_METRICS.map((m) => (
              <MetricCounter key={m.label} {...m} />
            ))}
          </motion.div>

          <motion.p className="hero__subtitle hero__subtitle--compact" variants={itemVariants}>
            {IDENTITY.summary}
          </motion.p>

          <motion.div className="hero__cta" variants={itemVariants}>
            <Link to="/projects/ibyapa" className="btn btn-primary">
              <FaRocket style={{ marginRight: 8 }} />
              View Case Study
            </Link>
            <Link to="/recruiters" className="btn btn-secondary">
              <FaBolt style={{ marginRight: 8 }} />
              For Recruiters
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <FaEnvelope style={{ marginRight: 8 }} />
              Contact
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
