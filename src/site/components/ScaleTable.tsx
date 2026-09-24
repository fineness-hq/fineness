import { ShieldCheck, ShieldAlert, Award } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

const BANDS = [
  {
    name: '22K / 24K',
    karat: '22K',
    purity: '916 – 1000 / 1000',
    ratio: '≥ 91.6% Pure Backing',
    color: 'var(--band-high)',
    certified: true,
    standing: 'Crucible Pinnacle',
    note: 'Investment grade bullion. Provable physical vault allocation & immediate redeemability.',
    from: 916,
    to: 1000,
  },
  {
    name: '18K Standard',
    karat: '18K',
    purity: '750 – 915 / 1000',
    ratio: '75.0% – 91.5% Backing',
    color: 'var(--gold)',
    certified: true,
    standing: 'Institutional Grade',
    note: 'High-fineness tier. Verified audited custodian with strict solvency proofs.',
    from: 750,
    to: 916,
  },
  {
    name: '14K Standard',
    karat: '14K',
    purity: '585 – 749 / 1000',
    ratio: '58.5% – 74.9% Backing',
    color: 'var(--band-mid)',
    certified: true,
    standing: 'Commercial Grade',
    note: 'Standard tokenized collateral. Adequate backing, some operational opacity.',
    from: 585,
    to: 750,
  },
  {
    name: '9K Minimum',
    karat: '9K',
    purity: '375 – 584 / 1000',
    ratio: '37.5% – 58.4% Backing',
    color: 'var(--band-low)',
    certified: true,
    standing: 'Baseline Hallmark',
    note: 'Minimum acceptable threshold to clear the Hallmark Register gate.',
    from: 375,
    to: 585,
  },
  {
    name: 'Below Hallmark',
    karat: '< 9K',
    purity: '0 – 374 / 1000',
    ratio: '< 37.5% Verifiable',
    color: 'var(--band-none)',
    certified: false,
    standing: 'Uncertified / Raw',
    note: 'Fails assay threshold. Synthetic, unpegged, or zero custodian transparency.',
    from: 0,
    to: 375,
  },
];

export default function ScaleTable() {
  return (
    <section aria-labelledby="scale-title" id="scale" className="page-wrap py-12">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-4">
          <div>
            <p className="eyebrow">STANDARDS // METALLURGICAL SCALE</p>
            <h2
              id="scale-title"
              className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            >
              <WordText text="The Hallmark Karat Scale" />
            </h2>
            <p className="prose mt-1 max-w-[68ch] text-sm leading-relaxed text-[var(--ink-2)]">
              Fineness is calibrated on a standard 0 to 1000 basis. The official assay cutoff is strictly 375 / 1000 (9K).
              Venues below 375 / 1000 remain uncertified and are denied institutional hallmark status.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] px-3 py-2 font-mono text-xs">
            <span className="flex h-2 w-2 rounded-full bg-[var(--gold)]" />
            <span className="font-semibold text-[var(--ink)]">OFFICIAL CUTOFF:</span>
            <span className="font-extrabold text-[var(--gold)]">375 / 1000 (9 KARAT)</span>
          </div>
        </div>

        {/* Precision Metallurgical Caliper Ingot Bar */}
        <div className="mt-8 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
          {/* Caliper ticks header */}
          <div className="relative mb-2 flex justify-between font-mono text-[10px] font-semibold text-[var(--ink-3)]">
            <span>0 (RAW)</span>
            <span className="text-[var(--gold)] font-bold">375 / 1000 (GATE)</span>
            <span>585</span>
            <span>750</span>
            <span>916</span>
            <span>1000 (PURE)</span>
          </div>

          <div
            className="relative h-14 overflow-hidden rounded-lg border border-[var(--dark)] bg-[var(--surface-alt)] shadow-inner"
            role="img"
            aria-label="Karat scale from 0 to 1000 with hallmark gate at 375"
          >
            {/* Band Segments */}
            <div className="absolute inset-0 flex">
              {[...BANDS].reverse().map((b) => (
                <div
                  key={b.name}
                  className="group relative h-full flex flex-col items-center justify-center transition-all hover:brightness-110"
                  style={{
                    width: `${((b.to - b.from) / 1000) * 100}%`,
                    background: b.color,
                  }}
                  title={`${b.name}: ${b.note}`}
                >
                  <span className="mono text-[11px] font-extrabold uppercase tracking-wider text-white drop-shadow-xs">
                    {b.karat}
                  </span>
                  <span className="mono text-[9px] font-semibold text-white/80 tabular-nums">
                    {b.from} / 1000
                  </span>
                </div>
              ))}
            </div>

            {/* Hallmark Gate Brass Blade */}
            <div
              className="absolute inset-y-0 z-20 pointer-events-none"
              style={{ left: '37.5%' }}
            >
              <div className="h-full w-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8),0_0_0_1px_rgba(15,20,25,0.6)]" />
              <div className="absolute -left-12 -top-1 rounded bg-[var(--dark)] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[var(--gold)] shadow-md">
                375 GATE
              </div>
            </div>
          </div>
        </div>

        {/* High-End Swiss Assay Standard Ledger */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
          <div className="grid grid-cols-1 divide-y divide-[var(--rule)]">
            {BANDS.map((b) => (
              <div
                key={b.name}
                className="group flex flex-col md:flex-row md:items-center justify-between p-4 transition-colors hover:bg-[var(--tint)]/40 gap-3"
              >
                {/* Karat Badge & Name */}
                <div className="flex items-center gap-3.5 min-w-[220px]">
                  <div
                    className="flex h-10 w-14 flex-col items-center justify-center rounded border border-black/10 shadow-xs font-mono"
                    style={{ background: b.color }}
                  >
                    <span className="text-[12px] font-black text-white leading-none">
                      {b.karat}
                    </span>
                    <span className="text-[8px] font-bold text-white/80 uppercase mt-0.5">
                      HALLMARK
                    </span>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-inter)] text-sm font-bold text-[var(--ink)]">
                      {b.name}
                    </h3>
                    <p className="mono text-xs font-semibold text-[var(--gold)]">
                      {b.purity}
                    </p>
                  </div>
                </div>

                {/* Backing Ratio & Description */}
                <div className="flex-1 md:px-4">
                  <div className="flex items-center gap-2">
                    <span className="mono text-xs font-bold text-[var(--ink)]">
                      {b.ratio}
                    </span>
                    <span className="text-[var(--rule)]">•</span>
                    <span className="mono text-xs font-semibold text-[var(--ink-2)]">
                      {b.standing}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--ink-2)] leading-relaxed">
                    {b.note}
                  </p>
                </div>

                {/* Certified Seal Status */}
                <div className="flex items-center justify-end md:min-w-[150px]">
                  {b.certified ? (
                    <span className="mono inline-flex items-center gap-1.5 rounded-full border border-[var(--ok)]/30 bg-[var(--ok)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--ok)]">
                      <ShieldCheck size={13} />
                      CERTIFIED
                    </span>
                  ) : (
                    <span className="mono inline-flex items-center gap-1.5 rounded-full border border-[var(--band-none)]/30 bg-[var(--band-none)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--band-none)]">
                      <ShieldAlert size={13} />
                      UNCERTIFIED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
