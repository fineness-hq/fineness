import React from 'react';
import Image from 'next/image';

interface FinenessMarkProps {
  className?: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Sovereign Fineness Hallmark Mark (Auditor Cat with Golden Orbit).
 */
export default function FinenessMark({
  className = '',
  size = 24,
  style,
}: FinenessMarkProps) {
  const width = Math.round(size * 1.43);

  return (
    <Image
      src="/logo.webp"
      alt="Fineness Hallmark Mark"
      width={width}
      height={size}
      style={{ width: 'auto', height: size, ...style }}
      className={`shrink-0 object-contain ${className}`}
      priority={size >= 24}
    />
  );
}

