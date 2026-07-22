import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

export default function RecruiterFab() {
  const { pathname } = useLocation();
  if (pathname === '/recruiters' || pathname.startsWith('/admin')) return null;

  return (
    <motion.div
      className="recruiter-fab"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
    >
      <Link to="/recruiters" className="recruiter-fab-btn">
        <FaBriefcase />
        <span>Looking to hire?</span>
      </Link>
    </motion.div>
  );
}
