'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Terminal, Code, ArrowUpRight, ShieldCheck, Copy, Check } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

interface ProtocolCTAProps {
  edition: string;
}

/**
 * ProtocolCTA:
 * Web3 developer & institutional portal for integrating Fineness feeds.
 * Enhanced with scroll-driven scale-in and illuminated terminal box.
 */
export default function ProtocolCTA({ edition }: ProtocolCTAProps) {
  const reduce = useReducedMotion();
  const [copied, setCopied] = React.useState(false);

  const curlCommand = `curl -s <host>/editions/${edition}.json | jq '.venues[] | {name, fineness, band}'`;

  function copyCurl() {
    navigator.clipboard?.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section aria-labelledby="cta-title" className="page-wrap py-16">
      <Reveal>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 0.33, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl border-2 border-[var(--rule)] bg-[var(--surface)] p-8 sm:p-12 shadow-xl"
        >
          {/* Top Gold Bullion Stripe */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--tint)] px-3 py-1 font-mono text-xs font-bold text-[var(--gold)]">
                <Terminal size={13} />
                <span>OPEN MACHINE-READABLE REGISTER</span>
              </div>

              <h2
                id="cta-title"
                className="mt-4 font-[var(--font-inter)] text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)]"
              >
                <WordText text="Take the frozen register with you, as JSON" />
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--ink-2)]">
                Every frozen edition ships beside a machine-readable JSON file with the same data the page renders: venues, scores, bands, ranks, metrics and sources.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/editions/${edition}.json`}
                  className="mono inline-flex items-center gap-2 rounded-lg bg-[var(--dark)] px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[var(--gold)] hover:text-black hover:shadow-lg cursor-pointer"
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
                  <span>METHODOLOGY</span>
                </Link>
              </div>
            </div>

            {/* Quick API Snippet box with Copy Button */}
            <div className="w-full lg:w-96 rounded-xl border-2 border-[var(--rule)] bg-[var(--dark)] text-white p-4 font-mono text-xs shadow-2xl shrink-0">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px]">
                <span className="text-white/60 flex items-center gap-1">
                  <Terminal size={11} className="text-[var(--gold)]" />
                  <span>TERMINAL CURL</span>
                </span>
                <button
                  type="button"
                  onClick={copyCurl}
                  className="inline-flex items-center gap-1 text-[var(--gold)] hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={10} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={10} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto text-[11px] leading-relaxed text-amber-200">
                <code>{curlCommand}</code>
              </pre>
              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-white/50">
                <span>FORMAT: APPLICATION/JSON</span>
                <span className="text-emerald-400 font-bold">HTTP 200 OK</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
