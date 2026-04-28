import React from 'react';

const projectFallbackImage = (title = 'Project') => {
  const initials = title
    .split(' ')
    .map((part) => part[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0%' stop-color='%23111827'/><stop offset='100%' stop-color='%231e3a8a'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='120' fill='%23f8fafc'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export default function ProjectCard({ p }){
  return (
    <article className="card">
      <div style={{height:160,overflow:'hidden',borderRadius:6}}>
        <img
          src={p.image}
          alt={p.title}
          style={{width:'100%',height:'100%',objectFit:'cover'}}
          onError={(e) => {
            e.currentTarget.src = projectFallbackImage(p.title);
          }}
        />
      </div>
      <h3 style={{marginTop:12}}>{p.title}</h3>
      <p className="muted" style={{fontSize:14}}>{p.description}</p>
      <div style={{marginTop:8,display:'flex',gap:8,flexWrap:'wrap'}}>
        {p.tags.map(t => <span key={t} style={{fontSize:12,padding:'6px 8px',background:'#222',borderRadius:4}}>{t}</span>)}
      </div>
      <div style={{marginTop:12}}>
        <a className="btn" href={p.link}>Read more</a>
      </div>
    </article>
  )
}
