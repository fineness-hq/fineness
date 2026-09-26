import React, { useId } from 'react';

interface FinenessMarkProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Sovereign Fineness Hallmark: The Crescent Crucible & Arrow "F".
 * Precision 3D metallic brushed gold geometry with cyan laser rim accent.
 */
export default function FinenessMark({
  className = '',
  size = 24,
  color,
}: FinenessMarkProps) {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Fineness Hallmark Mark"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id={`goldGrad-${id}`} x1="15%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="35%" stopColor="#E5B232" />
          <stop offset="70%" stopColor="#B37C0C" />
          <stop offset="100%" stopColor="#784E03" />
        </linearGradient>
        <linearGradient id={`goldFacet-${id}`} x1="85%" y1="15%" x2="20%" y2="85%">
          <stop offset="0%" stopColor="#FFE899" />
          <stop offset="50%" stopColor="#C99418" />
          <stop offset="100%" stopColor="#5E3C00" />
        </linearGradient>
        <linearGradient id={`cyanRim-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0.3" />
        </linearGradient>
        <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#22D3EE" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Cyan Laser Inner Rim Glow */}
      <path
        d="M 58 17 C 28 17 18 42 28 72 C 34 52 46 36 62 25 Z"
        fill="none"
        stroke={`url(#cyanRim-${id})`}
        strokeWidth="1.8"
        filter={`url(#glow-${id})`}
        opacity="0.85"
      />

      {/* Crescent Crucible Base (Outer Curve) */}
      <path
        d="M 61 14 C 24 16 12 45 23 76 C 29 82 34 85 41 85 C 57 85 70 75 79 60 C 65 72 48 76 35 68 C 24 58 24 38 43 24 C 48 20 54 16 61 14 Z"
        fill={color || `url(#goldGrad-${id})`}
      />

      {/* Crescent Inner Facet / Bevel */}
      <path
        d="M 59 18 C 28 22 20 45 28 70 C 37 54 50 36 65 26 C 63 23 61 20 59 18 Z"
        fill={`url(#goldFacet-${id})`}
        opacity="0.4"
      />

      {/* Arrow Shaft & Monogram "F" Wings */}
      {/* Main Diagonal Arrow Shaft */}
      <path
        d="M 28 71 L 68 28 L 73 33 L 33 76 Z"
        fill={color || `url(#goldGrad-${id})`}
      />

      {/* Arrowhead */}
      <path
        d="M 76 17 L 78 37 L 70 34 L 66 38 L 65 30 L 61 27 L 76 17 Z"
        fill={color || `url(#goldGrad-${id})`}
      />

      {/* "F" Top Rung (Upper Facet Wing) */}
      <path
        d="M 54 42 L 67 43 L 69 49 L 58 48 Z"
        fill={color || `url(#goldFacet-${id})`}
      />

      {/* "F" Middle Rung (Secondary Wing) */}
      <path
        d="M 43 53 L 53 54 L 54 59 L 46 58 Z"
        fill={color || `url(#goldGrad-${id})`}
      />

      {/* Bevel Highlight Line */}
      <path
        d="M 31 73 L 71 30"
        stroke="#FFF8D6"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
