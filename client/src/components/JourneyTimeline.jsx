import React from 'react';
import { FaMapMarkerAlt, FaArrowDown } from 'react-icons/fa';
import { GEO_JOURNEY, CAREER_MILESTONES } from '../data/journey';

export default function JourneyTimeline() {
  return (
    <div className="journey-timeline">
      <div className="journey-geo">
        {GEO_JOURNEY.map((stop, idx) => (
          <React.Fragment key={stop.place}>
            <div className="journey-geo-stop">
              <FaMapMarkerAlt className="journey-geo-icon" />
              <div>
                <strong>{stop.place}</strong>
                <p className="muted">{stop.detail}</p>
              </div>
            </div>
            {idx < GEO_JOURNEY.length - 1 && (
              <div className="journey-geo-arrow" aria-hidden="true"><FaArrowDown /></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="journey-milestones">
        {CAREER_MILESTONES.map((m) => (
          <div
            key={`${m.year}-${m.event}`}
            className="journey-milestone"
          >
            <span className="journey-year">{m.year}</span>
            <span className="journey-event">{m.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
