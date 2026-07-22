import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { CURRENTLY_ITEMS } from '../data/currently';

export default function CurrentlySection({ compact = false }) {
  return (
    <section className={`currently-section ${compact ? 'currently-section--compact' : ''}`}>
      <h3 className="currently-heading">Currently</h3>
      <ul className="currently-list">
        {CURRENTLY_ITEMS.map((item) => (
          <li key={item.label} className="currently-item">
            <FaCircle className="currently-dot" />
            <div>
              <strong>{item.label}</strong>
              {!compact && item.detail && <p className="muted">{item.detail}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
