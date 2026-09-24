/** Standing limits of the methodology. Static editorial copy. */
import { BookOpen, AlertCircle, EyeOff, Scale } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

const LIMITS_DATA = [
  {
    canonId: 'judgement',
    canonLabel: 'CANON: EMPIRICAL JUDGEMENT',
    title: 'Judgement Over Measurement',
    desc: 'Scores are qualitative judgements on public information at the cut date, not automated measurements or real-time oracle feeds.',
    icon: Scale,
  },
  {
    canonId: 'silence',
    canonLabel: 'CANON: DISCLOSURE INTEGRITY',
    title: 'Non-Publication Integrity',
    desc: 'A missing metric renders as not published (—), never defaulted to zero. Absence of disclosure is distinct from proven insolvency.',
    icon: EyeOff,
  },
  {
    canonId: 'reality',
    canonLabel: 'CANON: MARKET BASELINE',
    title: 'Verifiable Volume Reality',
    desc: 'Four of ten venues publish no verifiable volume. That is the baseline market condition across tokenized physical commodity protocols.',
    icon: AlertCircle,
  },
  {
    canonId: 'pairing',
    canonLabel: 'CANON: STRUCTURAL THESIS',
    title: 'Pairing Asset Hypothesis',
    desc: 'Pairing assets carry the thesis: the physical backing often manifests solely through the pairing structure rather than the native wrapper.',
    icon: BookOpen,
  },
];

export default function Limits() {
  return (
    <section aria-labelledby="limits-title" id="limits" className="page-wrap py-12">
      <Reveal>
        <div className="border-b border-[var(--rule)] pb-4">
          <p className="eyebrow">ASSAY CHARTER // METHODOLOGICAL BOUNDARIES</p>
          <h2
            id="limits-title"
            className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
          >
            <WordText text="Standing Methodological Boundaries" />
          </h2>
          <p className="prose mt-1 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
            Four foundational axioms governing how data is sampled, weighed, and audited.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {LIMITS_DATA.map(({ canonId, canonLabel, title, desc, icon: Icon }) => (
            <div
              key={canonId}
              className="group relative rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-xs transition-all hover:border-[var(--gold)] hover:shadow-sm"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[var(--rule)]/60">
                <span className="mono text-[11px] font-black text-[var(--gold)] tracking-wider">
                  {canonLabel}
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-2)] group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-white transition-all">
                  <Icon size={12} />
                </span>
              </div>
              <h3 className="mt-3 font-[var(--font-inter)] text-base font-bold text-[var(--ink)]">
                {title}
              </h3>
              <p className="prose mt-2 text-xs leading-relaxed text-[var(--ink-2)]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
