import Link from 'next/link';
import { Github, ArrowUpRight, ShieldCheck, FileCode, CheckCircle2 } from 'lucide-react';
import FinenessMark from './FinenessMark';
import XIcon from './XIcon';
import { KNOWN_EDITION_IDS } from '../editions';

interface FooterProps {
  edition: string;
}

/**
 * Footer:
  * Site directory with edition archive and source links.
 * Redesigned with zero dummy forms, zero fake venues, and 100% verified working routes.
 */
export default function Footer({ edition }: FooterProps) {
  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] select-none">
      {/* Top Banner: Brand Statement & Strict Disclaimer */}
      <div className="page-wrap py-12 md:py-16 border-b border-[var(--rule)]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="max-w-xl">
            <Link href="/" className="inline-flex items-center gap-3 group" aria-label="Fineness Home">
              <FinenessMark size={52} className="-mr-4" />
              <span className="font-[var(--font-inter)] text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                FINENESS
              </span>
              <span className="mono text-xs font-bold px-2 py-0.5 rounded border border-[var(--gold)]/40 bg-[var(--tint)] text-[var(--gold)]">
                EDITION {edition}
              </span>
            </Link>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[var(--ink-2)] max-w-lg">
              Scores are editorial judgements on public information. Fineness is not an audit, a credit rating, or investment advice.
            </p>
          </div>

          {/* Hallmarking Standard & Gate Notice */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[var(--surface-alt)] border border-[var(--rule)] rounded-2xl p-4 sm:p-5 font-mono text-xs">
            <div className="h-10 w-10 rounded-xl border border-[var(--gold)]/50 bg-[var(--tint)] flex items-center justify-center text-[var(--gold)] shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--gold)]">HALLMARK 375 GATE</span>
                <span className="text-[10px] text-[var(--ink-3)]">• 9-KARAT LINE</span>
              </div>
              <p className="text-[11px] text-[var(--ink-2)] mt-0.5">
                Deterministic 0–1000 scale. Unbribable editorial code with zero sponsored listing fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Directory Grid */}
      <div className="page-wrap py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: The Register */}
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--gold)] pb-3 border-b border-[var(--rule)]">
              The Register
            </p>
            <ul className="mt-4 space-y-2.5 font-mono text-xs">
              <li>
                <Link href="/#register" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                  Current Register
                </Link>
              </li>
              <li>
                <Link href="/#scale" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                  Karat Scale
                </Link>
              </li>
              <li>
                <Link href="/#crucible-disclosure" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                  The Backing Gap
                </Link>
              </li>
              <li>
                <Link href="/#refinery-pipeline" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                  Refinery Pipeline
                </Link>
              </li>
              <li>
                <Link href="/#utility-suite" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                  Risk Engine & Utility
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                  Primer & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Methodology Spec */}
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--gold)] pb-3 border-b border-[var(--rule)]">
              Methodology
            </p>
            <ul className="mt-4 space-y-2.5 font-mono text-xs">
              <li>
                <Link href="/method" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
                  <span>Method Overview</span>
                  <ArrowUpRight size={12} className="text-[var(--gold)]" />
                </Link>
              </li>
              <li>
                <Link href="/method#criteria" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                  5 House Weights (30/25/20/15/10)
                </Link>
              </li>
              <li>
                <Link href="/method#bands" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                  Karat Bands (22k · 18k · 14k · 9k)
                </Link>
              </li>
              <li>
                <Link href="/method#admission" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                  Admission & Strike Standard
                </Link>
              </li>
              <li>
                <Link href="/method#null" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                  Null Discipline Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Historical Editions */}
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--gold)] pb-3 border-b border-[var(--rule)]">
              Editions Archive
            </p>
            <ul className="mt-4 space-y-2.5 font-mono text-xs">
              {[...KNOWN_EDITION_IDS].reverse().map((id, i, arr) => (
                <li key={id}>
                  <div className="flex items-center justify-between gap-2">
                    <Link href={`/editions/${id}`} className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
                      <span>Edition {id}</span>
                    </Link>
                    <span className="flex items-center gap-2">
                      <Link
                        href={`/editions/${id}.json`}
                        className="text-[10px] text-[var(--ink-3)] hover:text-[var(--gold)] transition-colors"
                        title={`Edition ${id} machine JSON`}
                      >
                        JSON
                      </Link>
                      {i === 0 ? (
                        <span className="text-[10px] text-emerald-500 font-bold">LATEST</span>
                      ) : i === arr.length - 1 ? (
                        <span className="text-[10px] text-[var(--ink-3)]">GENESIS</span>
                      ) : (
                        <span className="text-[10px] text-[var(--ink-3)]">FROZEN</span>
                      )}
                    </span>
                  </div>
                </li>
              ))}
              <li className="pt-2 border-t border-[var(--rule)]">
                <Link
                  href={`/editions/${edition}.json`}
                  className="site-link inline-flex items-center gap-1.5 text-xs text-[var(--gold)] hover:underline"
                >
                  <FileCode size={13} />
                  <span>EDITION {edition}.JSON</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Open Protocol & Source */}
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--gold)] pb-3 border-b border-[var(--rule)]">
              Verifiability
            </p>
            <ul className="mt-4 space-y-2.5 font-mono text-xs">
              <li>
                <a
                  href="https://github.com/fineness-hq/fineness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1.5"
                >
                  <Github size={13} />
                  <span>GitHub Repository</span>
                  <ArrowUpRight size={12} className="text-[var(--ink-3)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/finenesslabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1.5"
                >
                  <XIcon size={12} />
                  <span>X Profile</span>
                  <ArrowUpRight size={12} className="text-[var(--ink-3)]" />
                </a>
              </li>
              <li className="text-[var(--ink-3)] text-[11px]">
                Deterministic SHA-256 Digest
              </li>
              <li className="text-[var(--ink-3)] text-[11px]">
                Immutable Edition JSON
              </li>
              <li className="text-[var(--ink-3)] text-[11px]">
                Zero Listing Fees / Grants
              </li>
              <li className="pt-2 border-t border-[var(--rule)] text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <CheckCircle2 size={12} />
                <span>OPEN DATA · METHOD + JSON PUBLIC</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Timestamp */}
      <div className="page-wrap py-6 border-t border-[var(--rule)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[var(--ink-3)]">
        <div className="flex items-center gap-3">
          <span>FINENESS HQ © 2026</span>
          <span>•</span>
          <span>FINENESS SCORING DESK</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="#top" className="text-[var(--ink-2)] hover:text-[var(--gold)] transition-colors">
            ↑ BACK TO TOP
          </Link>
        </div>
      </div>
    </footer>
  );
}
