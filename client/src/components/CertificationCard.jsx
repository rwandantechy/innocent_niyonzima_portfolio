import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaTrophy, FaBriefcase, FaDatabase, FaBolt, FaCheckCircle, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const iconMap = {
  'graduation': FaGraduationCap,
  'trophy': FaTrophy,
  'briefcase': FaBriefcase,
  'database': FaDatabase,
  'bolt': FaBolt
};

// Simple Icons CDN mapping for programming languages
const langIconMap = {
  'JavaScript': 'javascript',
  'C++': 'cplusplus',
  'PHP': 'php',
  'Java': 'java',
  'HTML': 'html5',
  'C#': 'csharp',
  'Python': 'python',
  'SQL': 'microsoftsqlserver',
  'LINUX': 'linux',
  'React': 'react',
  'Node': 'nodedotjs'
};

export default function CertificationCard({ title, issuer, date, iconType, status, certificateUrl, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showModal, setShowModal] = useState(false);
  const [iconError, setIconError] = useState(false);
  
  // Check if this is a programming language certificate
  const getLangIcon = () => {
    for (const [lang, icon] of Object.entries(langIconMap)) {
      if (title.includes(lang)) {
        return `https://cdn.simpleicons.org/${icon}/fd961a`;
      }
    }
    return null;
  };
  
  const langIconUrl = getLangIcon();
  const IconComponent = iconMap[iconType] || FaGraduationCap;
  
  const handleViewCertificate = () => {
    if (certificateUrl) {
      // Check if it's a PDF or image
      if (certificateUrl.endsWith('.pdf')) {
        window.open(certificateUrl, '_blank');
      } else {
        setShowModal(true);
      }
    }
  };
  
  return (
    <>
      <motion.div 
        ref={ref}
        className="certification-card"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        <div className="cert-icon-wrapper">
          {langIconUrl && !iconError ? (
            <img 
              src={langIconUrl} 
              alt={title}
              className="cert-lang-icon"
              onError={() => setIconError(true)}
            />
          ) : (
            <IconComponent className="cert-icon" style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }} />
          )}
        </div>
        <div className="cert-content">
          <h4>{title}</h4>
          <p className="cert-issuer">{issuer}</p>
          <div className="cert-footer">
            <span className="cert-date">{date}</span>
            {status === 'ongoing' && (
              <motion.span 
                className="cert-badge cert-badge-ongoing"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaClock style={{ marginRight: 4, fontSize: '0.7rem' }} />
                Ongoing
              </motion.span>
            )}
            {status === 'completed' && (
              <span className="cert-badge cert-badge-completed">
                <FaCheckCircle style={{ marginRight: 4, fontSize: '0.7rem' }} />
                Completed
              </span>
            )}
          </div>
          {certificateUrl && (
            <motion.button
              className="cert-view-btn"
              onClick={handleViewCertificate}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt style={{ marginRight: 6, fontSize: '0.8rem' }} />
              View Certificate
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Modal for image certificates */}
      {showModal && certificateUrl && certificateUrl.endsWith(('.png', '.jpg', '.jpeg')) && (
        <motion.div
          className="cert-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="cert-modal-content"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <img src={certificateUrl} alt={title} />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
