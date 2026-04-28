import React from 'react';

// Official company and university logos from their websites
const companyLogoMap = {
  'The Catholic University of America': 'https://legacywww.catholic.edu/assets/images/CUA-Logo-Large.png',
  'Nkotanyi Driving School': 'https://ibyapa.com/images/logo.jpg',
  'Nishkaam Innovations LLP': 'https://nishkaamllp.com/assets/logo.png',
  'Marwadi University': 'https://www.marwadiuniversity.ac.in/wp-content/themes/marwadi-university/assets/img/logomain.svg',
  'Andela': 'https://cdn.prod.website-files.com/660dcc7f45ad8881324199b5/66267ca5100e5bf7643aa0d6_andela_logo.svg'
};

const getCompanyLogo = (company) => {
  // Exact match first
  if (companyLogoMap[company]) {
    return companyLogoMap[company];
  }
  
  // Partial match
  for (const [key, url] of Object.entries(companyLogoMap)) {
    if (company.includes(key) || key.includes(company)) {
      return url;
    }
  }
  
  // Fallback - generated local SVG (no network dependency)
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
          key={idx}
          className={`timeline-item ${idx < items.length - 1 ? 'timeline-item--divider' : ''}`}
        >
          <div className="timeline-dot" />

          {item.company && (
            <img
              src={getCompanyLogo(item.company)}
              alt={item.company}
              loading="lazy"
              decoding="async"
              className="timeline-logo"
              onError={(e) => {
                e.target.src = getCompanyLogo(item.company || 'NA');
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
