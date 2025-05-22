import React from 'react';
import { Tooltip } from 'react-tooltip';
import { Tag } from 'primereact/tag';

export default function TruncatedCell({ tooltipId, value, max = 5 }) {
  if (!Array.isArray(value) || value.length === 0) return value;

  const displayValue = value.slice(0, max);
  const hiddenValue = value.length > max ? value.slice(max).join(', ') : '';

  return (
    <div

      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
    >
      {displayValue.map((val, i) => (
        <Tag key={i} value={val} />
      ))}
      {value.length > max ? (
        <Tag
          value={`+${value.length - max}`}
          data-tooltip-id={tooltipId}
          data-tooltip-content={hiddenValue}
        />
      ) : null}

      <Tooltip id={tooltipId} />
    </div>
  );
}
