/** Null-safe metric formatting. Null never renders as zero. */
export function usd(value: number | null): string {
  if (value == null) return 'not published';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

/** Compact cell form. Null renders as n/a. */
export function dash(value: number | null): string {
  if (value == null) return 'n/a';
  return usd(value);
}

/** Normalized weight (0..1) as a percentage label. */
export function pct(weight: number): string {
  return `${(weight * 100).toFixed(1)}%`;
}
