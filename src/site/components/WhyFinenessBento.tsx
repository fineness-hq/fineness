'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Sliders, ShieldCheck, TrendingUp, Lock } from 'lucide-react';
import Reveal from './Reveal';
import { WordText } from './Stagger';

const BENTO_CARDS = [
  {
    title: 'For Traders & Arbitrageurs',
    category: 'RISK DETECTION',
    desc: 'Detect depeg risks before liquidity exits. Distinguish between actual redeemable physical gold bars in Zurich and synthetic unallocated paper claims.',
    icon: TrendingUp,
    badge: 'FRONT-RUN INSOLVENCY',
  },
  {
    title: 'For Protocol Treasuries',
    category: 'COLLATERAL QUALITY',
    desc: 'Money markets and stablecoin issuers use Fineness Karat standings to set collateral debt caps and borrow thresholds, filtering out toxic unbacked assets.',
    icon: Lock,
    badge: 'MONEY MARKET GRADE',
  },
  {
    title: 'Zero Sponsored Hallmarks',
    category: 'INDEPENDENT ASSAY',
    desc: 'Uncompromising editorial independence. No venue can buy an 18K or 22K hallmark. If vault reserves fail inspection, the venue is struck from the register.',
    icon: ShieldCheck,
    badge: 'UNBRIBABLE AUDIT',
  },
  {
    title: 'Reweigh Your Own Order',
    category: 'CUSTOM METHODOLOGY',
    desc: 'Disagree with our house weights? Adjust the five criteria sliders dynamically. Your custom weights encode into the URL for instant verifiable sharing.',
    icon: Sliders,
    badge: 'URL-ENCODED WEIGHTS',
  },
];

/**
 * WhyFinenessBento:
 * 4-card interactive bento grid showing value proposition for traders, protocols, and builders.
 */
export default function WhyFinenessBento() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="why-title" className="page-wrap py-14 border-b border-[var(--rule)]">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--rule)] pb-4">
          <div>
            <p className="eyebrow">UTILITY // WHO USES FINENESS</p>
            <h2
              id="why-title"
              className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)]"
            >
              <WordText text="Built for Capital That Cannot Afford to Guess" />
            </h2>
            <p className="prose mt-1 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-2)]">
              When millions in on-chain collateral are on the line, hearsay is fatal. Fineness provides deterministic proof.
            </p>
          </div>

          <div className="mono text-xs font-bold text-[var(--gold)]">
            STANDARDS // ZERO COMPROMISE
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {BENTO_CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                className="group relative flex flex-col justify-between rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-xs transition-all hover:border-[var(--gold)] hover:shadow-md"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 0.33, 0.3, 1] }}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                    <span className="mono rounded bg-[var(--surface-alt)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--ink-2)]">
                      {c.category}
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--surface-alt)] text-[var(--gold)] group-hover:bg-[var(--dark)] group-hover:text-white transition-all">
                      <Icon size={14} />
                    </span>
                  </div>

                  <h3 className="mt-4 font-[var(--font-inter)] text-lg font-bold text-[var(--ink)] group-hover:text-[var(--gold)] transition-colors">
                    {c.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[var(--ink-2)]">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--rule)]">
                  <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                    {c.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
