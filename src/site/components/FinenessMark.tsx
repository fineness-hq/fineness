import React from 'react';

interface FinenessMarkProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
  * Geometric "F" Hallmark Mark. Polygonal architecture.
 * Two nested right-angle polygon brackets forming the sovereign "F" hallmark.
 */
export default function FinenessMark({
  className = '',
  size = 24,
  color = 'var(--gold)',
}: FinenessMarkProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Fineness"
      className={`shrink-0 ${className}`}
    >
      {/* Outer Bracket (Top bar & main stem) */}
      <polygon points="80,0 80,20 20,20 20,80 0,80 0,0" fill={color} />
      {/* Inner Bracket (Middle rung & interior stem) */}
      <polygon points="65,26 65,46 45,46 45,80 25,80 25,26" fill={color} />
    </svg>
  );
}
