'use client';

import { useEffect, useState } from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { CRITERIA, HOUSE_WEIGHTS, normalise } from '../../scoring/fineness';
import type { Criterion, Weights } from '../../scoring/fineness';
import { serializeWeights } from '../weight-url';
import { pct } from '../lib/format';

export type RawSliders = Record<Criterion, number>;

interface WeightPanelProps {
  initialRaw?: RawSliders;
  onWeightsChange?: (weights: Weights) => void;
}

const PRESETS: Record<string, RawSliders> = {
  house: { asset: 6, traction: 5, transparency: 4, compliance: 3, durability: 2 },
  volume: { asset: 3, traction: 10, transparency: 4, compliance: 2, durability: 2 },
  safety: { asset: 4, traction: 2, transparency: 10, compliance: 10, durability: 4 },
  equal: { asset: 5, traction: 5, transparency: 5, compliance: 5, durability: 5 },
};

const LABELS: Record<Criterion, string> = {
  asset: 'Asset quality',
  traction: 'Traction',
  transparency: 'Transparency',
  compliance: 'Compliance',
  durability: 'Durability',
};

function rawFromWeights(weights: Weights): RawSliders {
  const out = {} as RawSliders;
  for (const c of CRITERIA) out[c] = Math.min(10, Math.max(0, Math.round(weights[c] * 20)));
  return out;
}

/** Five sliders plus presets. Normalized percentages shown, URL synced via replaceState. */
export default function WeightPanel({
  initialRaw = PRESETS.house,
  onWeightsChange,
}: WeightPanelProps) {
  const [raw, setRaw] = useState<RawSliders>(initialRaw);
  const weights = normalise(raw);
  const custom =
    JSON.stringify(raw) !== JSON.stringify(rawFromWeights(HOUSE_WEIGHTS));

  useEffect(() => {
    onWeightsChange?.(weights);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(raw)]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.pathname}${serializeWeights(weights)}`;
    window.history.replaceState(null, '', url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(raw)]);

  function reset() {
    setRaw({ ...PRESETS.house });
  }

  return (
    <section
      aria-labelledby="weights-title"
      className="sticky top-[72px] z-20 border-y border-[var(--rule)] bg-[var(--surface)]"
    >
      <div className="page-wrap py-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} aria-hidden="true" className="text-[var(--maroon)]" />
            <h2
              id="weights-title"
              className="font-[var(--font-inter)] text-xl font-bold tracking-tight text-[var(--ink)]"
            >
              Reweight the register
            </h2>
          </div>
          {custom && (
            <button
              type="button"
              onClick={reset}
              className="mono flex min-h-[44px] items-center gap-1 px-2 text-xs text-[var(--maroon)] underline-offset-4 hover:underline"
            >
              <RotateCcw size={14} aria-hidden="true" />
              Reset to house
            </button>
          )}
        </div>
        {custom && (
          <p role="status" className="mono mt-2 text-xs text-[var(--ink-2)]">
            Custom weights active. This view is shareable via the URL.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Weight presets">
          {Object.keys(PRESETS).map((name) => {
            const active = JSON.stringify(raw) === JSON.stringify(PRESETS[name]);
            return (
              <button
                key={name}
                type="button"
                aria-pressed={active}
                onClick={() => setRaw({ ...PRESETS[name] })}
                className={`mono min-h-[44px] border px-3 text-xs capitalize hover:border-[var(--maroon)] ${
                  active
                    ? 'border-[var(--dark)] bg-[var(--dark)] text-[#f2f0ee]'
                    : 'border-[var(--rule-2)] bg-[var(--surface-2)] text-[var(--ink-2)]'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CRITERIA.map((c) => (
            <label key={c} className="block border border-[var(--rule)] bg-[var(--surface-2)] p-3">
              <span className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-[var(--ink)]">{LABELS[c]}</span>
                <span className="mono text-xs tabular-nums text-[var(--ink-2)]">
                  {raw[c]} — {pct(weights[c])}
                </span>
              </span>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={raw[c]}
                aria-label={`${LABELS[c]} weight, 0 to 10`}
                onChange={(e) => setRaw((prev) => ({ ...prev, [c]: Number(e.target.value) }))}
                className="mt-2 w-full accent-[#e65800]"
              />
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
