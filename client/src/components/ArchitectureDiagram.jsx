import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

export default function ArchitectureDiagram({ layers, title = 'System Architecture' }) {
  if (!layers?.length) return null;

  return (
    <div className="arch-diagram">
      {title && <h4 className="arch-diagram-title">{title}</h4>}
      <div className="arch-diagram-stack">
        {layers.map((layer, idx) => (
          <React.Fragment key={layer.label}>
            <div className="arch-diagram-node">
              <span className="arch-diagram-label">{layer.label}</span>
              {layer.detail && <span className="arch-diagram-detail muted">{layer.detail}</span>}
            </div>
            {idx < layers.length - 1 && (
              <div className="arch-diagram-arrow" aria-hidden="true">
                <FaArrowDown />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
