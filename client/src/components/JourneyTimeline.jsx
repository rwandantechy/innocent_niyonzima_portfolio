import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaArrowDown } from 'react-icons/fa';
import { GEO_JOURNEY, CAREER_MILESTONES } from '../data/journey';

export default function JourneyTimeline() {
  return (
    <div className="journey-timeline">
      <div className="journey-geo">
        {GEO_JOURNEY.map((stop, idx) => (
          <React.Fragment key={stop.place}>
            <motion.div
              className="journey-geo-stop"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <FaMapMarkerAlt className="journey-geo-icon" />
              <div>
                <strong>{stop.place}</strong>
                <p className="muted">{stop.detail}</p>
              </div>
            </motion.div>
            {idx < GEO_JOURNEY.length - 1 && (
              <div className="journey-geo-arrow" aria-hidden="true"><FaArrowDown /></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="journey-milestones">
        {CAREER_MILESTONES.map((m, idx) => (
          <motion.div
            key={`${m.year}-${m.event}`}
            className="journey-milestone"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <span className="journey-year">{m.year}</span>
            <span className="journey-event">{m.event}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
