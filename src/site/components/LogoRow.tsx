'use client';

import { useState } from 'react';
import { band } from '../../scoring/fineness';
import { BAND_COLOR } from './Entry';

interface LogoRowProps {
  items: { name: string; fineness: number }[];
}

/**
 * Venue ticker tape: rank pills with band-colored score chips.
 * Duplicated content loops seamlessly, pauses on hover, edges fade.
 */
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
      {items.map((v, i) => {
        const b = band(v.fineness);
        return (
          <span
            key={`${hidden ? 'b' : 'a'}-${v.name}`}
            className="mono flex items-center whitespace-nowrap text-xs uppercase tracking-widest text-[var(--ink-2)]"
          >
            <span className="flex items-center gap-2 rounded-lg border border-[var(--rule)] bg-[var(--surface)] py-1.5 pl-2 pr-3 shadow-2xs transition-all hover:-translate-y-px hover:border-[var(--gold)] hover:shadow-xs">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[var(--surface-alt)] border border-[var(--rule)] text-[10px] font-black tabular-nums text-[var(--ink)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-extrabold text-[var(--ink)] tracking-tight">{v.name}</span>
              <span
                className="rounded px-1.5 py-0.2 text-[10px] font-black tabular-nums shadow-2xs"
                style={{
                  backgroundColor: BAND_COLOR[b],
                  color: '#ffffff',
                }}
              >
                {v.fineness} <span className="text-[8px] font-normal opacity-85">/1000</span>
              </span>
              <span className="text-[9px] font-bold text-[var(--ink-3)]">
                [{b.toUpperCase()}]
              </span>
            </span>
            <span
              aria-hidden="true"
              className="mx-4 text-[var(--gold)] opacity-70 font-bold"
            >
              ★
            </span>
          </span>
        );
      })}
    </div>
  );

  return (
    <div aria-label="Venue ticker" className="overflow-hidden border-b border-[var(--rule)] bg-[var(--surface-2)]">
      <div className="tera-ticker flex w-max py-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
