import React from 'react';

export default function TruncatedCell({ value, max = 50 }) {
  if (!value) return null;

  return (
    <span title={value}>
      {value.length > max ? `${value.slice(0, max)}...` : value}
    </span>
  );
}
