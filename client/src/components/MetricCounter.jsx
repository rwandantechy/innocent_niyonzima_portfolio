import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

function formatNumber(n) {
  if (n >= 1000) return n.toLocaleString('en-US');
  return String(n);
}

export default function MetricCounter({ value, suffix = '', label, display, isText = false, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || isText) return;
    started.current = true;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(value);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration, isText]);

  const shown = isText
    ? display
    : `${formatNumber(count)}${suffix}`;

  return (
    <div ref={ref} className="metric-counter-card">
      <span className="metric-counter-value gradient-text">{shown}</span>
      <span className="metric-counter-label">{label}</span>
    </div>
  );
}
