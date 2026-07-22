import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../context/ThemeProvider';
import InnocentImage from '../assets/images/Innocent.png';

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/blogs', label: 'Writing' },
    { to: '/about', label: 'About' },
    { to: '/resume', label: 'Resume' }
  ];

  return (
    <motion.nav 
      className={`navbar-premium nb-shell ${scrolled || isOpen ? 'navbar-scrolled' : ''} ${isOpen ? 'navbar-menu-open' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-bg-blur nb-blur" />
      
      <div className="container nb-container">
        <div className="navbar-content-premium nb-content">
          <Link to="/" className="nb-brand">
            <img src={InnocentImage} alt="Innocent Niyonzima" className="nb-logo-image" />
            <span className="nb-name">Innocent N.</span>
          </Link>

          <ul className="navbar-menu-premium desktop-menu nb-menu">
            {navLinks.map((link, idx) => (
              <motion.li 
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={link.to} 
                  className={`navbar-link-premium nb-link ${location.pathname === link.to ? 'active' : ''}`}
                >
                  <span>{link.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="navbar-actions nb-actions">
            <motion.button
              type="button"
              className="theme-toggle-premium nb-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'dark'}
              whileHover={{ scale: 1.08 }}
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

            <motion.div 
              className="cta-wrapper desktop-only nb-cta-wrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="navbar-cta nb-cta">
                <FaEnvelope style={{ marginRight: '6px' }} />
                Contact
              </Link>
            </motion.div>

            <motion.button 
              className="mobile-menu-toggle-premium nb-mobile-toggle"
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
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              className="mobile-menu-backdrop"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              className="mobile-menu-premium nb-mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <div className="container">
                <ul className="mobile-menu-list">
                  {navLinks.map((link, idx) => (
                    <motion.li 
                      key={link.to}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link 
                        to={link.to} 
                        className={`mobile-menu-link ${location.pathname === link.to ? 'active' : ''}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="mobile-link-text">{link.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div 
                  className="mobile-menu-footer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link to="/contact" className="mobile-cta-btn" onClick={() => setIsOpen(false)}>
                    <FaEnvelope />
                    Contact
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
