'use client';

import { useEffect, useState } from 'react';
import { RotateCcw, SlidersHorizontal, Share2, Check, Sparkles } from 'lucide-react';
import { CRITERIA, HOUSE_WEIGHTS, normalise } from '../../scoring/fineness';
import type { Criterion, Weights } from '../../scoring/fineness';
import { serializeWeights } from '../weight-url';
import { pct } from '../lib/format';

export type RawSliders = Record<Criterion, number>;

interface WeightPanelProps {
  initialRaw?: RawSliders;
  onWeightsChange?: (weights: Weights) => void;
}

const PRESETS: Record<string, { label: string; desc: string; values: RawSliders }> = {
  house: {
    label: 'House Standard',
    desc: 'Editorial 30/25/20/15/10 baseline',
    values: { asset: 6, traction: 5, transparency: 4, compliance: 3, durability: 2 },
  },
  volume: {
    label: 'Traction Velocity',
    desc: 'Max priority on liquidity and volume',
    values: { asset: 3, traction: 10, transparency: 4, compliance: 2, durability: 2 },
  },
  safety: {
    label: 'Compliance First',
    desc: 'Heaviest on legal compliance & docs',
    values: { asset: 4, traction: 2, transparency: 10, compliance: 10, durability: 4 },
  },
  equal: {
    label: 'Equalized',
    desc: 'Pure 20% flat weight across all five',
    values: { asset: 5, traction: 5, transparency: 5, compliance: 5, durability: 5 },
  },
};

const LABELS: Record<Criterion, { name: string; tag: string }> = {
  asset: { name: 'Asset Quality', tag: 'Backing Purity' },
  traction: { name: 'Traction', tag: 'Volume & Depth' },
  transparency: { name: 'Transparency', tag: 'Contracts & Docs' },
  compliance: { name: 'Compliance', tag: 'Regulatory Standing' },
  durability: { name: 'Durability', tag: 'Shock Resilience' },
};

function rawFromWeights(weights: Weights): RawSliders {
  const out = {} as RawSliders;
  for (const c of CRITERIA) out[c] = Math.min(10, Math.max(0, Math.round(weights[c] * 20)));
  return out;
}

/**
 * Web3 Weight Synthesizer Console:
 * Interactive audio-equalizer style assay desk with live percent meters,
 * animated level tracks, shareable state encoding in URL, and quick presets.
 */
export default function WeightPanel({
  initialRaw = PRESETS.house.values,
  onWeightsChange,
}: WeightPanelProps) {
  const [raw, setRaw] = useState<RawSliders>(initialRaw);
  const [copied, setCopied] = useState(false);
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
    setRaw({ ...PRESETS.house.values });
  }

  async function shareLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      aria-labelledby="weights-title"
      className="border-b border-[var(--rule)] bg-[var(--surface)] p-6 transition-all"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--tint)] text-[var(--action)]">
              <SlidersHorizontal size={14} aria-hidden="true" />
            </span>
            <h2
              id="weights-title"
              className="font-[var(--font-inter)] text-lg font-bold tracking-tight text-[var(--ink)]"
            >
              Assay Weight Synthesizer
            </h2>
          </div>
          <p className="mt-1 text-xs text-[var(--ink-2)]">
            Adjust criterion faders to recompute live register rankings in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {custom && (
            <button
              type="button"
              onClick={reset}
              className="mono flex items-center gap-1.5 rounded border border-[var(--rule)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium text-[var(--action)] transition-all hover:bg-[var(--tint)]"
            >
              <RotateCcw size={13} aria-hidden="true" />
              Reset House
            </button>
          )}

          <button
            type="button"
            onClick={shareLink}
            className="mono flex items-center gap-1.5 rounded border border-[var(--rule)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition-all hover:border-[var(--dark)] hover:bg-[var(--surface)]"
            title="Copy shareable URL containing your custom weights"
          >
            {copied ? (
              <>
                <Check size={13} className="text-[var(--ok)]" />
                URL Copied!
              </>
            ) : (
              <>
                <Share2 size={13} className="text-[var(--ink-3)]" />
                Share Custom Order
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset pills */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="mono text-[11px] uppercase tracking-wider text-[var(--ink-3)]">
          Presets:
        </span>
        {Object.entries(PRESETS).map(([key, item]) => {
          const active = JSON.stringify(raw) === JSON.stringify(item.values);
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => setRaw({ ...item.values })}
              className={`mono flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all ${
                active
                  ? 'border-[var(--dark)] bg-[var(--dark)] text-white shadow-xs'
                  : 'border-[var(--rule)] bg-[var(--surface-2)] text-[var(--ink-2)] hover:border-[var(--gold)] hover:bg-[var(--tint)]'
              }`}
            >
              {active && <Sparkles size={11} className="text-[var(--gold)]" />}
              {item.label}
            </button>
          );
        })}
      </div>

      {/* 5 Equalizer Criterion Faders */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CRITERIA.map((c) => {
          const val = raw[c];
          return (
            <div
              key={c}
              className="group relative flex flex-col justify-between rounded border border-[var(--rule)] bg-[var(--surface-2)] p-3 transition-all hover:border-[var(--dark)] hover:bg-[var(--tint)]/50"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--ink)]">{LABELS[c].name}</span>
                  <span className="mono font-bold tabular-nums text-[var(--action)]">
                    {pct(weights[c])}
                  </span>
                </div>
                <div className="mono mt-0.5 text-[10px] uppercase tracking-wide text-[var(--ink-3)]">
                  {LABELS[c].tag}
                </div>
              </div>

              {/* Graphic Equalizer Bar Meter */}
              <div className="my-3 flex items-end gap-1 h-8 rounded bg-[var(--surface-alt)] p-1">
                {Array.from({ length: 10 }).map((_, barIdx) => {
                  const isActive = barIdx < val;
                  return (
                    <div
                      key={barIdx}
                      className="flex-1 rounded-[1px] transition-all duration-150"
                      style={{
                        height: `${(barIdx + 1) * 10}%`,
                        backgroundColor: isActive
                          ? barIdx >= 8
                            ? 'var(--action)'
                            : barIdx >= 5
                            ? 'var(--gold)'
                            : 'var(--band-high)'
                          : 'var(--rule)',
                        opacity: isActive ? 1 : 0.35,
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={val}
                  aria-label={`${LABELS[c].name} weight, 0 to 10`}
                  onChange={(e) => setRaw((prev) => ({ ...prev, [c]: Number(e.target.value) }))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[var(--surface-alt)] accent-[var(--action)] transition-all"
                />
                <span className="mono w-4 text-right text-[11px] font-semibold text-[var(--ink-2)]">
                  {val}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
