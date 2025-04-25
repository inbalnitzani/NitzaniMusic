import React from 'react';
import { Tooltip } from 'react-tooltip'

export default function TruncatedCell({ tooltipId,value, max = 50 }) {
  if (!value) return null;

  return (
<div>
<span title={value} data-tooltip-id={tooltipId} data-tooltip-content={value}>
      {value.length > max ? `${value.slice(0, max)}...` : value}
    </span>
    <Tooltip id={tooltipId} />

</div>


  );
}
