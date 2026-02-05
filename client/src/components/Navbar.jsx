import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun, FaRocket, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../context/ThemeProvider';

export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/about', label: 'About' },
    { to: '/blogs', label: 'Blog' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <motion.nav 
      className={`navbar-premium ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-bg-blur" />
      
      <div className="container">
        <div className="navbar-content-premium">
          {/* Logo / Branding */}
          <Link to="/" className="navbar-logo-premium">
            <motion.div 
              className="logo-wrapper"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Desktop: Text Logo */}
              <span className="logo-text desktop-logo">
                <span className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: '900' }}>Rwandantechy</span>
              </span>
              
              {/* Mobile: Artistic Initials Logo */}
              <span className="logo-initials mobile-logo">IN</span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <ul className="navbar-menu-premium desktop-menu">
            {navLinks.map((link, idx) => (
              <motion.li 
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={link.to} 
                  className={`navbar-link-premium ${location.pathname === link.to ? 'active' : ''}`}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
            {/* Theme Toggle */}
            <motion.button
              type="button"
              className="theme-toggle-premium"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'dark'}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaSun />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaMoon />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA Button - Desktop Only */}
            <motion.div 
              className="cta-wrapper desktop-only"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="navbar-cta">
                <FaEnvelope style={{ marginRight: '6px' }} />
                Get In Touch
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button 
              className="mobile-menu-toggle-premium"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="mobile-menu-premium"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="mobile-menu-list">
                {navLinks.map((link, idx) => (
                  <motion.li 
                    key={link.to}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      to={link.to} 
                      className={`mobile-menu-link ${location.pathname === link.to ? 'active' : ''}`}
                    >
                      <span className="mobile-link-text">{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div 
                className="mobile-menu-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/contact" className="mobile-cta-btn" onClick={() => setIsOpen(false)}>
                  <FaEnvelope />
                  Get In Touch
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
