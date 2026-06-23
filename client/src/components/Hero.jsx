import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaBolt, FaCode, FaEnvelope } from 'react-icons/fa';
import { IDENTITY } from '../data/story';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="hero hd-shell">
      <div className="container">
        <motion.div 
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hd-badge" variants={itemVariants}>
            <FaCode />
            {IDENTITY.tagline}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h1 className="hero__title">
              {IDENTITY.headline}
            </h1>
          </motion.div>
          
          <motion.p 
            className="hero__subtitle"
            variants={itemVariants}
          >
            {IDENTITY.summary}
          </motion.p>
          
          <motion.div 
            className="hero__cta"
            variants={itemVariants}
          >
            <Link to="/projects" className="btn btn-primary">
              <FaRocket style={{ marginRight: 8 }} />
              View Projects
            </Link>
            <Link to="/about" className="btn btn-secondary">
              <FaBolt style={{ marginRight: 8 }} />
              My Story
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <FaEnvelope style={{ marginRight: 8 }} />
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
