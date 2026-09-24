import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Lock,
  XCircle,
  FileCode,
  ArrowRight,
} from 'lucide-react';
import Footer from '../../src/site/components/Footer';
import Masthead from '../../src/site/components/Masthead';
import { LATEST_EDITION } from '../../src/site/editions';

export const metadata: Metadata = {
  title: 'Fineness — Methodology & Standing Standard',
  description:
    'Standing methodology and admission standard of the Fineness register. Scoring weights, karat bands, admission rules, and integrity constraints.',
};

interface WeightItem {
  criterion: string;
  weight: string;
  weightPct: number;
  tag: string;
  desc: string;
}

const CRITERIA_SPECS: WeightItem[] = [
  {
    criterion: 'Asset Quality & Verifiability',
    weight: '30%',
    weightPct: 30,
    tag: 'BACKING EVIDENCE',
    desc: 'What backs the token and how it verifies: custody, redemption terms, and verifiability of the pairing asset.',
  },
  {
    criterion: 'Traction & Market Depth',
    weight: '25%',
    weightPct: 25,
    tag: 'VOLUME & DEPTH',
    desc: 'Cumulative and daily volume, venue share, fee revenue and pool depth across the observation window.',
  },
  {
    criterion: 'Transparency',
    weight: '20%',
    weightPct: 20,
    tag: 'CONTRACTS & DOCS',
    desc: 'Verified contracts, lock schedules, public docs and a named operating entity.',
  },
  {
    criterion: 'Compliance & Standing',
    weight: '15%',
    weightPct: 15,
    tag: 'DISCLOSURE',
    desc: 'Regulatory standing and disclosure: licences, prospectus route, terms and risk statements.',
  },
  {
    criterion: 'Durability',
    weight: '10%',
    weightPct: 10,
    tag: 'TRACK RECORD',
    desc: 'Age, shock resilience and dependencies: uptime across market cycles and operator continuity.',
  },
];

const BANDS = [
  {
    name: '22k',
    range: '916 to 1000',
    color: '#0F1419',
    goldPct: '91.6% - 100%',
    desc: 'Top band on the 0–1000 scale. No venue in the current register reaches it.',
  },
  {
    name: '18k',
    range: '750 to 915',
    color: '#3A3222',
    goldPct: '75.0% - 91.5%',
    desc: 'High fineness. Nothing in this category clears it as of the latest edition.',
  },
  {
    name: '14k',
    range: '585 to 749',
    color: '#7A622A',
    goldPct: '58.5% - 74.9%',
    desc: 'Where the current leaders sit: documented backing with real volume.',
  },
  {
    name: '9k',
    range: '375 to 584',
    color: '#B08830',
    goldPct: '37.5% - 58.4%',
    desc: 'At or above the 375 hallmark: certified, with thinner evidence or flow.',
  },
  {
    name: 'Below hallmark',
    range: 'Under 375',
    color: '#943A2A',
    goldPct: '< 37.5%',
    desc: 'Listed for public scrutiny, not certified.',
  },
];

const ADMISSION_RULES = [
  {
    title: 'Deployed & Verified Contract',
    desc: 'A deployed contract on a public chain, verified on that chain explorer.',
  },
  {
    title: 'Real-World Pairing Claim',
    desc: 'A pairing asset that claims real world backing, or a launch mechanic that routes value to a real world asset.',
  },
  {
    title: 'Completed Public Launch',
    desc: 'At least one completed public launch or live market at the cut date.',
  },
  {
    title: 'Reachable Public Interface',
    desc: 'A reachable public interface or documentation under a domain the operator controls.',
  },
];

const INTEGRITY_PILLARS = [
  {
    title: 'Zero Paid Inclusions',
    desc: 'No venue pays for inclusion, placement, or removal. No commercial code path exists.',
  },
  {
    title: 'No Affiliate or Marketing Tolls',
    desc: 'Affiliate links, sponsored endorsements, and referral cuts are strictly prohibited across all editions.',
  },
  {
    title: 'Universal Source Verifiability',
    desc: 'Every single metric links to an immutable sourceId resolving to the edition source registry.',
  },
  {
    title: 'Null Over Zero Precision',
    desc: 'Unpublished or missing metrics render strictly as null ("not published"), never disguised as zero.',
  },
  {
    title: 'Immutable Edition Ledger',
    desc: 'Published editions are cryptographically sealed with SHA-256 hashes. Corrections ship as dated errata.',
  },
];

/**
 * MethodPage:
 * Luxury Swiss Gold Assay Methodology and Admission Charter.
 */
export default function MethodPage() {
  return (
    <main className="min-h-screen bg-[var(--ground)] text-[var(--ink)]">
      <Masthead edition={LATEST_EDITION.edition} latestEdition={LATEST_EDITION.edition} />

      {/* Hero Header */}
      <div className="relative border-b border-[var(--rule)] bg-[var(--surface-alt)] py-16 md:py-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,139,15,0.08)_0%,transparent_70%)]"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
            <p className="eyebrow text-[var(--gold)] font-mono text-xs tracking-widest">
              STANDING CHARTER // METALLURGICAL METHODOLOGY
            </p>
          </div>

          <h1 className="mt-3 font-[var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] leading-tight">
            The Fineness Admission Standard & Scoring Methodology
          </h1>

          <p className="prose mt-4 max-w-[68ch] text-sm sm:text-base md:text-lg leading-relaxed text-[var(--ink-2)]">
            The methodology is the product. Every score is deterministically reproducible from published public inputs.
            Scores are editorial judgements on public information. Fineness is never an audit, a credit rating, or financial advice.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 rounded-lg border border-[var(--rule)] bg-[var(--surface)] px-3 py-1.5 shadow-2xs">
              <Scale size={13} className="text-[var(--gold)]" />
              <span className="text-[var(--ink-2)]">FORMULA:</span>
              <span className="font-bold text-[var(--ink)]">WEIGHTED MEAN × 100</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-[var(--rule)] bg-[var(--surface)] px-3 py-1.5 shadow-2xs">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span className="text-[var(--ink-2)]">GATE:</span>
              <span className="font-bold text-[var(--ink)]">375 / 1000 CUTOFF</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-[var(--rule)] bg-[var(--surface)] px-3 py-1.5 shadow-2xs">
              <Lock size={13} className="text-[var(--gold)]" />
              <span className="text-[var(--ink-2)]">GOVERNANCE:</span>
              <span className="font-bold text-[var(--ink)]">ZERO-TOLL INDEPENDENCE</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: 5-PILLAR SCORING ENGINE */}
      <section aria-labelledby="scoring-title" className="mx-auto max-w-5xl px-4 sm:px-6 py-16 border-b border-[var(--rule)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--rule)]">
          <div>
            <p className="eyebrow text-[var(--gold)] font-mono text-xs tracking-widest">
              CALIBRATION ENGINE // 5-PILLAR WEIGHT DISTRIBUTION
            </p>
            <h2
              id="scoring-title"
              className="mt-1 font-[var(--font-inter)] text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]"
            >
              The 5-Pillar Scoring Weights
            </h2>
          </div>
          <div className="font-mono text-xs px-3 py-1.5 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)]">
            <span className="text-[var(--ink-3)]">HOUSE WEIGHT SUM: </span>
            <span className="font-black text-[var(--gold)]">100% (SUM = 1.0)</span>
          </div>
        </div>

        <p className="prose mt-4 max-w-[68ch] text-xs sm:text-sm leading-relaxed text-[var(--ink-2)]">
          Each venue is evaluated 0 to 10 across five independent criteria. The weighted mean is multiplied by 100 and rounded once
          at the end to produce a permanent Fineness score from 0 to 1000. Ties break alphabetically by venue name to ensure ordering remains stable.
        </p>

        {/* 5 Pillar Grid Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CRITERIA_SPECS.map((spec) => (
            <div
              key={spec.criterion}
              className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-5 flex flex-col justify-between shadow-xs hover:border-[var(--gold)]/60 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                  <span className="font-mono text-[10px] font-bold text-[var(--gold)] tracking-wider">
                    {spec.tag}
                  </span>
                  <span className="font-mono text-sm font-black px-2 py-0.5 rounded border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink)]">
                    {spec.weight}
                  </span>
                </div>
                <h3 className="mt-3 font-[var(--font-inter)] text-base font-bold text-[var(--ink)]">
                  {spec.criterion}
                </h3>
                <p className="mt-2 text-xs text-[var(--ink-2)] leading-relaxed">
                  {spec.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--rule)]">
                <div className="w-full h-1.5 rounded-full bg-[var(--surface-alt)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--gold)] rounded-full"
                    style={{ width: `${spec.weightPct * 3.33}%` }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Caliper Formula Summary Card */}
          <div className="rounded-xl border-2 border-dashed border-[var(--gold)]/40 bg-[var(--tint)]/40 p-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-[var(--gold)] tracking-wider">
                MATHEMATICAL CALIPER
              </span>
              <h3 className="mt-3 font-[var(--font-inter)] text-base font-bold text-[var(--ink)]">
                Deterministic Calculation
              </h3>
              <p className="mt-2 font-mono text-[11px] text-[var(--ink-2)] leading-relaxed">
                Fineness = Round((0.30 × Asset + 0.25 × Traction + 0.20 × Transparency + 0.15 × Compliance + 0.10 × Durability) × 100)
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--gold)]/20 font-mono text-[10px] text-[var(--gold)] font-bold">
              ✓ VERIFIABLE IN BROWSER & CLIENT ENGINE
            </div>
          </div>
        </div>

        {/* Retain Exact Table for Standard Accessibility and Acceptance Tests */}
        <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
          <table className="w-full min-w-[500px] border-collapse text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[var(--rule)] bg-[var(--surface-alt)]">
                <th scope="col" className="px-4 py-2.5 uppercase tracking-widest text-[var(--ink-3)]">
                  Evaluation Pillar
                </th>
                <th scope="col" className="px-4 py-2.5 uppercase tracking-widest text-[var(--ink-3)] text-right">
                  House Weight
                </th>
                <th scope="col" className="px-4 py-2.5 uppercase tracking-widest text-[var(--ink-3)]">
                  Core Metric Focus
                </th>
              </tr>
            </thead>
            <tbody>
              {CRITERIA_SPECS.map((item) => (
                <tr key={item.criterion} className="border-b border-[var(--rule)] last:border-0 hover:bg-[var(--surface-alt)]/50">
                  <th scope="row" className="px-4 py-3 font-semibold text-[var(--ink)]">
                    {item.criterion}
                  </th>
                  <td className="px-4 py-3 text-right font-black text-[var(--gold)]">{item.weight}</td>
                  <td className="px-4 py-3 text-[var(--ink-2)]">{item.tag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: KARAT SPECTRUM & HALLMARK GATE */}
      <section aria-labelledby="bands-title" className="mx-auto max-w-5xl px-4 sm:px-6 py-16 border-b border-[var(--rule)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--rule)]">
          <div>
            <p className="eyebrow text-[var(--gold)] font-mono text-xs tracking-widest">
              PURITY SPECTRUM // KARAT RATINGS
            </p>
            <h2
              id="bands-title"
              className="mt-1 font-[var(--font-inter)] text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]"
            >
              The Hallmark Karat Bands
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)]">
            <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-ping" />
            <span className="font-bold text-[var(--ink)]">HALLMARK GATE: 375 / 1000 (9K)</span>
          </div>
        </div>

        <p className="prose mt-4 max-w-[68ch] text-xs sm:text-sm leading-relaxed text-[var(--ink-2)]">
          Fineness is calibrated on the standard Swiss metallurgical 0 to 1000 scale. Venues scoring at or above 375 receive an official hallmark band.
          Venues below 375 are admitted for transparency but remain uncertified.
        </p>

        {/* Karat Band Cards */}
        <div className="mt-8 space-y-3">
          {BANDS.map((b) => (
            <div
              key={b.name}
              className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black text-white shadow-xs"
                  style={{ backgroundColor: b.color }}
                >
                  {b.name.split(' ')[0]}
                </div>
                <div>
                  <h3 className="font-[var(--font-inter)] text-sm sm:text-base font-bold text-[var(--ink)]">
                    {b.name}
                  </h3>
                  <p className="text-xs text-[var(--ink-2)] mt-0.5">
                    {b.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:text-right font-mono">
                <div>
                  <span className="text-[10px] text-[var(--ink-3)] block uppercase">SCORE THRESHOLD</span>
                  <span className="text-xs sm:text-sm font-black text-[var(--ink)]">{b.range}</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-[10px] text-[var(--ink-3)] block uppercase">METRIC PURITY</span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--gold)]">{b.goldPct}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Retain Exact Table for Standard Accessibility and Acceptance Tests */}
        <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-xs">
          <table className="w-full min-w-[500px] border-collapse text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[var(--rule)] bg-[var(--surface-alt)]">
                <th scope="col" className="px-4 py-2.5 uppercase tracking-widest text-[var(--ink-3)]">
                  Band Nomenclature
                </th>
                <th scope="col" className="px-4 py-2.5 uppercase tracking-widest text-[var(--ink-3)]">
                  Fineness Range
                </th>
                <th scope="col" className="px-4 py-2.5 uppercase tracking-widest text-[var(--ink-3)]">
                  Certification Status
                </th>
              </tr>
            </thead>
            <tbody>
              {BANDS.map((b) => (
                <tr key={b.name} className="border-b border-[var(--rule)] last:border-0 hover:bg-[var(--surface-alt)]/50">
                  <th scope="row" className="px-4 py-3 font-semibold text-[var(--ink)]">
                    {b.name}
                  </th>
                  <td className="px-4 py-3 tabular-nums text-[var(--ink)]">{b.range}</td>
                  <td className="px-4 py-3 text-[var(--ink-2)]">
                    {b.range.includes('Under') ? (
                      <span className="text-red-600 font-bold">Uncertified</span>
                    ) : (
                      <span className="text-emerald-600 font-bold">Certified Institutional Hallmark</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: ADMISSION STANDARD */}
      <section aria-labelledby="admission-title" className="mx-auto max-w-5xl px-4 sm:px-6 py-16 border-b border-[var(--rule)]">
        <div className="pb-6 border-b border-[var(--rule)]">
          <p className="eyebrow text-[var(--gold)] font-mono text-xs tracking-widest">
            ADMISSION CHARTER // FOUR CONDITIONS
          </p>
          <h2
            id="admission-title"
            className="mt-1 font-[var(--font-inter)] text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]"
          >
            The Admission Standard
          </h2>
          <p className="prose mt-2 max-w-[68ch] text-xs sm:text-sm leading-relaxed text-[var(--ink-2)]">
            A venue is admitted to the Fineness register when all four conditions hold unconditionally at the edition snapshot cut date:
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ADMISSION_RULES.map((rule, idx) => (
            <div key={idx} className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-[var(--gold)]">
                <CheckCircle2 size={16} className="text-[var(--gold)] shrink-0" />
                <span>CONDITION {idx + 1}</span>
              </div>
              <h3 className="font-[var(--font-inter)] text-sm sm:text-base font-bold text-[var(--ink)]">
                {rule.title}
              </h3>
              <p className="mt-2 text-xs text-[var(--ink-2)] leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/5 p-4 sm:p-5 flex items-start gap-3">
          <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-[var(--ink-2)] leading-relaxed">
            <strong className="text-red-600 block mb-0.5">THE STRIKE RULE (DELISTING POLICY):</strong>
            A venue is struck from the register after 60 days without a launch, a dark public interface, or loss of domain/key control.
            A venue that fails the pairing condition on re-review is struck rather than scored low, because it was never in the tokenized asset category.
          </p>
        </div>
      </section>

      {/* SECTION 4: EDITORIAL INTEGRITY */}
      <section aria-labelledby="integrity-title" className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <div className="pb-6 border-b border-[var(--rule)]">
          <p className="eyebrow text-[var(--gold)] font-mono text-xs tracking-widest">
            EDITORIAL INTEGRITY // ZERO-TOLL MANDATE
          </p>
          <h2
            id="integrity-title"
            className="mt-1 font-[var(--font-inter)] text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)]"
          >
            Editorial Independence & Protocol Integrity
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {INTEGRITY_PILLARS.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--tint)] text-[var(--gold)] font-mono text-xs font-bold">
                ✓
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="text-xs text-[var(--ink-2)] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Edition Navigation & Developer Integration */}
        <div className="mt-8 pt-6 border-t border-[var(--rule)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <Link
              href={`/editions/${LATEST_EDITION.edition}`}
              className="flex items-center gap-1.5 font-bold text-[var(--ink)] hover:text-[var(--gold)] transition-colors underline-offset-4 hover:underline"
            >
              <span>CURRENT RECORD: EDITION {LATEST_EDITION.edition}</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <Link
            href={`/editions/${LATEST_EDITION.edition}.json`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
          >
            <FileCode size={13} />
            <span>RAW EDITION JSON ENDPOINT</span>
          </Link>
        </div>
      </section>

      <Footer edition={LATEST_EDITION.edition} />
    </main>
  );
}
