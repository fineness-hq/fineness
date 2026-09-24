import Link from 'next/link';
import { Terminal, Code, ArrowUpRight, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

interface ProtocolCTAProps {
  edition: string;
}

/**
 * ProtocolCTA:
 * Web3 developer & institutional portal for integrating Fineness feeds and submitting protocol audits.
 */
export default function ProtocolCTA({ edition }: ProtocolCTAProps) {
  return (
    <section aria-labelledby="cta-title" className="page-wrap py-14">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-8 sm:p-12 shadow-lg">
          {/* Top Gold Bullion Stripe */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[var(--gold)] via-[var(--dark)] to-[var(--gold)]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--tint)] px-3 py-1 font-mono text-xs font-bold text-[var(--gold)]">
                <Terminal size={13} />
                <span>OPEN DEVELOPER & AUDITOR APIS</span>
              </div>

              <h2
                id="cta-title"
                className="mt-4 font-[var(--font-inter)] text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)]"
              >
                <WordText text="Integrate Sovereign Gold Intelligence Into Your Protocol" />
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--ink-2)]">
                All crucible calculations, Karat band cutoffs, and custody vectors are available as open JSON endpoints. Query live edition data or verify smart contract reserve proofs directly.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/editions/${edition}.json`}
                  className="mono inline-flex items-center gap-2 rounded-lg bg-[var(--dark)] px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[var(--gold)] hover:shadow-lg"
                >
                  <Code size={14} />
                  <span>EDITION {edition}.JSON</span>
                  <ArrowUpRight size={14} />
                </Link>

                <Link
                  href="/method"
                  className="mono inline-flex items-center gap-2 rounded-lg border border-[var(--rule)] bg-[var(--surface)] px-5 py-3 text-xs font-bold text-[var(--ink)] shadow-xs transition-all hover:border-[var(--dark)]"
                >
                  <ShieldCheck size={14} className="text-[var(--gold)]" />
                  <span>FULL ASSAY METHODOLOGY</span>
                </Link>

                <a
                  href="https://github.com/fineness-hq/fineness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono inline-flex items-center gap-1.5 px-3 py-3 text-xs font-bold text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
                >
                  <span>GITHUB SOURCE ↗</span>
                </a>
              </div>
            </div>

            {/* Quick API Snippet preview box */}
            <div className="w-full lg:w-80 rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-4 font-mono text-xs shadow-inner shrink-0">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--rule)] text-[10px] text-[var(--ink-3)]">
                <span>TERMINAL CURL</span>
                <span className="text-[var(--gold)]">HTTP 200 OK</span>
              </div>
              <pre className="mt-3 overflow-x-auto text-[11px] leading-relaxed text-[var(--ink)]">
                <code>
                  {`curl -s https://fineness.gold/editions/${edition}.json \\
  | jq '.venues[] | {name, fineness, band}'`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
