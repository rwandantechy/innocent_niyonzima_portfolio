import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaRocket, FaUsers, FaBolt } from 'react-icons/fa';

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
    <section className="hero">
      <div className="hero__background">
        <div className="hero__grid"></div>
        <div className="hero__glow glow-1"></div>
        <div className="hero__glow glow-2"></div>
      </div>
      
      <div className="container">
        <motion.div 
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          <motion.div variants={itemVariants}>
            <h1 className="hero__title">
              Hi, I'm <span className="gradient-text">Innocent Niyonzima</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="hero__subtitle"
            variants={itemVariants}
          >
            Full-Stack & Backend Engineering Architect crafting scalable, 
            high-performance systems. Specialized in <strong>MERN, .NET Core, and Laravel</strong> 
            with a track record of delivering enterprise solutions that impact millions.
          </motion.p>
          
          <motion.div 
            className="hero__cta"
            variants={itemVariants}
          >
            <Link to="/projects" className="btn btn-primary">
              <FaRocket style={{ marginRight: 8 }} />
              Explore My Work
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <FaBolt style={{ marginRight: 8 }} />
              Start a Project
            </Link>
          </motion.div>
          
          <motion.div 
            className="hero__stats"
            variants={containerVariants}
          >
            <motion.div 
              className="stat"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <div className="stat-icon-wrapper">
                <FaUsers className="stat-icon" />
              </div>
              <div className="stat__number">40K+</div>
              <div className="stat__label">Users Impacted</div>
            </motion.div>
            <motion.div 
              className="stat"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <div className="stat-icon-wrapper">
                <FaRocket className="stat-icon" />
              </div>
              <div className="stat__number">95%</div>
              <div className="stat__label">Satisfaction Rate</div>
            </motion.div>
            <motion.div 
              className="stat"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <div className="stat-icon-wrapper">
                <FaBolt className="stat-icon" />
              </div>
              <div className="stat__number">6+</div>
              <div className="stat__label">Production Apps</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
