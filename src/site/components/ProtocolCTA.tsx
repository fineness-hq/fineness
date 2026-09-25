'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Terminal,
  Code,
  ArrowUpRight,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react';

interface ProtocolCTAProps {
  edition: string;
}

type TabKey = 'curl' | 'ts' | 'json';

/**
 * ProtocolCTA:
 * Institutional Web3 Developer & Machine Terminal Portal.
 * Redesigned into a luxury, interactive developer console with real tabs,
 * traffic lights, syntax-colored snippets, and live response preview.
 */
export default function ProtocolCTA({ edition }: ProtocolCTAProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('curl');
  const [copied, setCopied] = useState(false);

  const snippets: Record<TabKey, string> = {
    curl: `curl -s <host>/editions/${edition}.json \\
  | jq '.venues[] | {name, fineness, band}'`,
    ts: `const res = await fetch('/editions/${edition}.json');
const editionData = await res.json();

// Venues at or above the 375 hallmark
const certified = editionData.venues.filter(v => v.fineness >= 375);`,
    json: `{
  "edition": "${edition}",
  "snapshotHash": "sha256:69c7d65307a33bba6e82fc1b3…",
  "venues": [
    { "id": "pons", "name": "Pons", "fineness": 745, "band": "14k" },
    { "id": "long-xyz", "name": "Long.xyz", "fineness": 720, "band": "14k" },
    { "id": "csl", "name": "CSL", "fineness": 220, "band": "below-hallmark" }
  ]
}`,
  };

  function copyActiveSnippet() {
    navigator.clipboard?.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section aria-labelledby="cta-title" className="page-wrap py-20">
      <div
        className="relative overflow-hidden rounded-3xl border-2 border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-10 md:p-12 shadow-2xl"
      >
        {/* Top Gold Bullion Stripe */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)]" />

        {/* Atmospheric Swiss Vault Backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <Image
            src="/images/swiss-vault-bg.jpg"
            alt="Swiss Gold Bullion Vault"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center filter brightness-50 contrast-125 opacity-25"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-[var(--surface)]/90 to-[var(--surface)]/75" />
        </div>

        {/* Ambient Corner Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--gold)] opacity-10 blur-3xl"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column: Heading & Value Proposition (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--tint)] px-3 py-1 font-mono text-xs font-bold text-[var(--gold)] shadow-2xs">
                <Terminal size={13} className="text-[var(--gold)]" />
                <span>OPEN MACHINE-READABLE ENDPOINTS</span>
              </div>

              <h2
                id="cta-title"
                className="mt-4 font-[var(--font-inter)] text-3xl sm:text-4xl font-black tracking-tight text-[var(--ink)] leading-tight"
              >
                Take the frozen register with you, as JSON
              </h2>

                <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-[var(--ink-2)]">
                  Every frozen edition ships beside a verifiable machine-readable JSON dossier containing the exact data rendered on-screen: venues, scores, bands, ranks, raw metrics, and publication source registries.
                </p>

                <div className="mt-5 space-y-2 font-mono text-xs text-[var(--ink-2)]">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                    <span>Deterministic SHA-256 snapshot digest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                    <span>Permanent unbribable archival permalinks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                    <span>Zero rate-limits, zero API keys required</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/editions/${edition}.json`}
                  className="mono inline-flex items-center gap-2 rounded-xl bg-[var(--dark)] px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[var(--gold)] hover:text-black hover:shadow-xl cursor-pointer"
                >
                  <Code size={15} />
                  <span>FETCH EDITION {edition}.JSON</span>
                  <ArrowUpRight size={14} />
                </Link>

                <Link
                  href="/method"
                  className="mono inline-flex items-center gap-2 rounded-xl border border-[var(--rule)] bg-[var(--surface)] px-5 py-3 text-xs font-bold text-[var(--ink)] shadow-xs transition-all hover:border-[var(--dark)]"
                >
                  <ShieldCheck size={15} className="text-[var(--gold)]" />
                  <span>METHODOLOGY SPEC</span>
                </Link>

                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--gold)]/30 bg-[var(--tint)] font-mono text-xs text-[var(--gold)] shadow-xs">
                  <div className="relative h-6 w-6 rounded-md overflow-hidden shrink-0 border border-[var(--gold)]/50">
                    <Image
                      src="/images/cat-stamper-8bit.jpg"
                      alt="Chief Stamper Cat"
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-[11px]">FROZEN</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-End Developer Interactive Terminal Console (7 cols) */}
            <div className="lg:col-span-7 w-full">
              <div className="rounded-2xl border-2 border-[#1E252E] bg-[#0A0D12] text-slate-100 shadow-2xl overflow-hidden font-mono text-xs">
                
                {/* Terminal Window Title Bar (Mac-Style Traffic Lights + Tabs) */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#11161D] border-b border-white/10 select-none">
                  
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#EF4444] shadow-xs" />
                    <span className="h-3 w-3 rounded-full bg-[#F59E0B] shadow-xs" />
                    <span className="h-3 w-3 rounded-full bg-[#10B981] shadow-xs" />
                    <span className="ml-2 text-[11px] text-white/40 hidden sm:inline">
                      fineness-terminal — bash
                    </span>
                  </div>

                  {/* Snippet Tabs */}
                  <div className="flex items-center bg-[#0A0D12] rounded-lg p-0.5 border border-white/10 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setActiveTab('curl')}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                        activeTab === 'curl'
                          ? 'bg-[var(--gold)] text-black font-black shadow-xs'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      cURL
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('ts')}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                        activeTab === 'ts'
                          ? 'bg-[var(--gold)] text-black font-black shadow-xs'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      TypeScript
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('json')}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                        activeTab === 'json'
                          ? 'bg-[var(--gold)] text-black font-black shadow-xs'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Payload
                    </button>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={copyActiveSnippet}
                    aria-label="Copy snippet to clipboard"
                    className="flex items-center gap-1.5 text-xs text-[var(--gold)] hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-[10px]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span className="text-[10px] hidden sm:inline">COPY</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Terminal Code Body */}
                <div className="p-5 overflow-x-auto no-scrollbar min-h-[170px] max-h-[260px] flex items-start bg-[#0A0D12]">
                  <pre className="text-xs sm:text-[13px] leading-relaxed text-slate-200 w-full">
                    {activeTab === 'curl' && (
                      <code>
                        <span className="text-emerald-400">$ </span>
                        <span className="text-amber-300 font-bold">curl</span>
                        <span className="text-slate-400"> -s </span>
                        <span className="text-cyan-300">&lt;host&gt;/editions/{edition}.json</span>
                        <span className="text-slate-400"> \</span>
                        {'\n'}  <span className="text-purple-400">| </span>
                        <span className="text-amber-300 font-bold">jq</span>
                        <span className="text-emerald-300"> &apos;.venues[] | &#123;name, fineness, band&#125;&apos;</span>
                      </code>
                    )}

                    {activeTab === 'ts' && (
                      <code>
                        <span className="text-purple-400">import type </span>
                        <span className="text-amber-200">&#123; Edition &#125; </span>
                        <span className="text-purple-400">from </span>
                        <span className="text-emerald-300">&apos;./types&apos;</span>;
                        {'\n\n'}
                        <span className="text-purple-400">const </span>
                        <span className="text-cyan-300">res </span>
                        <span className="text-slate-400">= </span>
                        <span className="text-purple-400">await </span>
                        <span className="text-amber-300">fetch</span>
                        <span className="text-slate-400">(</span>
                        <span className="text-emerald-300">&apos;/editions/{edition}.json&apos;</span>
                        <span className="text-slate-400">)</span>;
                        {'\n'}
                        <span className="text-purple-400">const </span>
                        <span className="text-cyan-300">data</span>
                        <span className="text-slate-400">: </span>
                        <span className="text-amber-200">Edition </span>
                        <span className="text-slate-400">= </span>
                        <span className="text-purple-400">await </span>
                        <span className="text-cyan-300">res</span>.<span className="text-amber-300">json</span>();
                        {'\n'}
                        <span className="text-slate-400">{`// Venues at or above the 375 hallmark`}</span>
                        {'\n'}
                        <span className="text-purple-400">const </span>
                        <span className="text-cyan-300">certified </span>
                        <span className="text-slate-400">= </span>
                        <span className="text-cyan-300">data</span>.<span className="text-amber-300">venues</span>.<span className="text-amber-300">filter</span>
                        <span className="text-slate-400">(v =&gt; v.fineness &gt;= 375)</span>;
                      </code>
                    )}

                    {activeTab === 'json' && (
                      <code>
                        <span className="text-slate-400">&#123;</span>
                        {'\n'}  <span className="text-cyan-300">&quot;edition&quot;</span>: <span className="text-emerald-300">&quot;{edition}&quot;</span>,
                        {'\n'}  <span className="text-cyan-300">&quot;snapshotHash&quot;</span>: <span className="text-emerald-300">&quot;sha256:69c7d65307a33…&quot;</span>,
                        {'\n'}  <span className="text-cyan-300">&quot;venues&quot;</span>: [
                        {'\n'}    &#123; <span className="text-cyan-300">&quot;name&quot;</span>: <span className="text-emerald-300">&quot;Pons&quot;</span>, <span className="text-cyan-300">&quot;fineness&quot;</span>: <span className="text-amber-300 font-bold">745</span>, <span className="text-cyan-300">&quot;band&quot;</span>: <span className="text-[var(--gold)] font-bold">&quot;14k&quot;</span> &#125;,
                        {'\n'}    &#123; <span className="text-cyan-300">&quot;name&quot;</span>: <span className="text-emerald-300">&quot;Long.xyz&quot;</span>, <span className="text-cyan-300">&quot;fineness&quot;</span>: <span className="text-amber-300 font-bold">720</span>, <span className="text-cyan-300">&quot;band&quot;</span>: <span className="text-amber-400">&quot;14k&quot;</span> &#125;
                        {'\n'}  ]
                        {'\n'}<span className="text-slate-400">&#125;</span>
                      </code>
                    )}
                  </pre>
                </div>

                {/* Terminal Status Bar Footer */}
                <div className="px-4 py-2.5 bg-[#11161D] border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] text-white/50">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      HTTP 200 OK
                    </span>
                    <span>CONTENT-TYPE: APPLICATION/JSON</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span>CORS: *</span>
                    <span className="text-[var(--gold)] font-bold">PUBLIC ARCHIVE ENCLAVE</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }
