'use client';

import { useState } from 'react';

interface LogoRowProps {
  items: { name: string; fineness: number }[];
}

/** Infinite ticker tape. Duplicated content loops seamlessly, pauses on hover. */
export default function LogoRow({ items }: LogoRowProps) {
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  if (reduced) {
    return (
      <div aria-label="Top venues" className="border-b border-[var(--rule)] bg-[var(--surface)]">
        <div className="page-wrap flex flex-wrap items-center gap-x-10 gap-y-3 py-4">
          {items.slice(0, 5).map((v) => (
            <span
              key={v.name}
              className="mono text-xs uppercase tracking-widest text-[var(--ink-2)]"
            >
              {v.name}
              <span className="ml-2 tabular-nums text-[var(--ink-3)]">{v.fineness}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((v) => (
        <span
          key={`${hidden ? 'b' : 'a'}-${v.name}`}
          className="mono flex items-center gap-2 whitespace-nowrap px-8 text-xs uppercase tracking-widest text-[var(--ink-2)]"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
          {v.name}
          <span className="tabular-nums text-[var(--ink)]">{v.fineness}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div aria-label="Venue ticker" className="overflow-hidden border-b border-[var(--rule)] bg-[var(--surface)]">
      <div className="tera-ticker flex w-max py-3">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
