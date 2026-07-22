import React from 'react';

const initialsLogo = (company) => {
  const initials = (company || 'NA')
    .split(' ')
    .map((part) => part[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='100%' height='100%' rx='12' fill='%231f2937'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='28' fill='%23f8fafc'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      <div className="timeline-line" />

      {items.map((item, idx) => (
        <div
          key={`${item.company}-${item.date}-${idx}`}
          className={`timeline-item ${idx < items.length - 1 ? 'timeline-item--divider' : ''}`}
        >
          <div className="timeline-dot" />

          {item.company && (
            <img
              src={item.logo || initialsLogo(item.company)}
              alt={item.company}
              loading="lazy"
              decoding="async"
              className="timeline-logo"
              onError={(e) => {
                if (e.currentTarget.dataset.fallback === '1') return;
                e.currentTarget.dataset.fallback = '1';
                e.currentTarget.src = initialsLogo(item.company);
              }}
            />
          )}

          <div className="timeline-head">
            <h4 className="timeline-title">{item.title}</h4>
            <span className="accent timeline-date">{item.date}</span>
          </div>

          <p className="muted timeline-company">{item.company}</p>
          {item.location && <p className="muted timeline-location">{item.location}</p>}

          {item.highlights && item.highlights.length > 0 && (
            <ul className="timeline-highlights">
              {item.highlights.map((highlight, hIdx) => (
                <li key={hIdx}>{highlight}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
