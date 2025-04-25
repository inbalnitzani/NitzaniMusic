import React from 'react';
import { Tooltip } from 'react-tooltip'

export default function TruncatedCell({ tooltipId,value, max = 50 }) {
  if (!value) return null;

  return (
<div>
<a title={value} data-tooltip-id={tooltipId} data-tooltip-content={value}>
      {value.length > max ? `${value.slice(0, max)}...` : value}
    </a>
    <Tooltip id={tooltipId} />

</div>


  );
}
