'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Band } from '../../scoring/fineness';
import type { Venue } from '../../types';
import { BAND_COLOR } from './Entry';

interface HeroChartProps {
  venues: Venue[];
  ready: boolean;
}

/** Top-5 board. Bars grow on intro, hover highlights, click jumps to the entry. */
export default function HeroChart({ venues, ready }: HeroChartProps) {
  const reduce = useReducedMotion();
  const top = [...venues].sort((a, b) => b.fineness - a.fineness).slice(0, 5);

  function jump(id: string) {
    window.dispatchEvent(new CustomEvent<string>('fineness:expand', { detail: id }));
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="tera-board" role="img" aria-label="Top five venues by fineness">
      <p className="tera-board-head">
        <span>TOP 5</span>
        <span className="tera-board-live">
          <span className="tera-board-dot" aria-hidden="true" />
          HOUSE RANK
        </span>
      </p>
      <ul className="tera-board-rows">
        {top.map((v, i) => (
          <li key={v.id}>
            <button
              type="button"
              onClick={() => jump(v.id)}
              className="tera-board-row"
              aria-label={`${v.name}, fineness ${v.fineness}, go to entry`}
            >
              <span className="mono tera-board-rank">{String(i + 1).padStart(2, '0')}</span>
              <span className="tera-board-name">{v.name}</span>
              <span className="mono tera-board-value">{v.fineness}</span>
              <span className="tera-board-track">
                <motion.span
                  className="tera-board-fill"
                  style={{ background: BAND_COLOR[v.band as Band] }}
                  initial={reduce ? false : { width: '0%' }}
                  animate={ready || reduce ? { width: `${(v.fineness / 1000) * 100}%` } : {}}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: [0.16, 0.33, 0.3, 1.01] }}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="tera-board-foot">CLICK A ROW TO OPEN ITS ENTRY ↓</p>
    </div>
  );
}
