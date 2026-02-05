import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';

export default function Footer(){
  const socialLinks = [
    { icon: FaGithub, href: import.meta.env.VITE_GITHUB_URL || 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, href: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, href: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com', label: 'Twitter' },
    { icon: FaEnvelope, href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'contact@example.com'}`, label: 'Email' }
  ];

  const footerLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/blogs', label: 'Blog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section">
            <h3 className="gradient-text">Developer</h3>
            <p className="footer-description">
              Full-Stack Developer specializing in MERN and .NET Core technologies.
              Building scalable applications with technical excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {footerLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Get In Touch</h4>
            <ul className="footer-contact">
              <li>📧 {import.meta.env.VITE_CONTACT_EMAIL || 'contact@example.com'}</li>
              <li>💼 Available for opportunities</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="footer-social">
              {socialLinks.map(social => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={social.label}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="muted">
            &copy; {new Date().getFullYear()} Portfolio. 
          </p>
        </div>
      </div>
    </footer>
  )
}
