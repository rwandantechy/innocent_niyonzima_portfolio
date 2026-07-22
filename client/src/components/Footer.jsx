import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { CONTACT_EMAIL, SOCIAL } from '../config/env';
import { IDENTITY } from '../data/story';

export default function Footer() {
  const socialLinks = [
    { icon: FaLinkedin, href: SOCIAL.LINKEDIN, label: 'LinkedIn' },
    { icon: FaGithub, href: SOCIAL.GITHUB, label: 'GitHub' },
    { icon: FaTwitter, href: SOCIAL.TWITTER, label: 'Twitter' },
  ];

  const footerLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/resume', label: 'Resume' },
    { to: '/about', label: 'About' },
    { to: '/blogs', label: 'Writing' },
    { to: '/recruiters', label: 'Recruiters' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h3 className="gradient-text">Innocent Niyonzima</h3>
            <p className="footer-description">{IDENTITY.tagline}</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get In Touch</h4>
            <ul className="footer-contact">
              <li>
                <FaEnvelope aria-hidden="true" />
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              <li>
                <FaMapMarkerAlt aria-hidden="true" />
                <span>Washington, DC</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="footer-social">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-contact"
                    aria-label={social.label}
                    title={social.label}
                    whileHover={{ y: -4 }}
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
            &copy; {new Date().getFullYear()} Innocent Niyonzima
          </p>
        </div>
      </div>
    </footer>
  );
}
