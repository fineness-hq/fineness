'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import FinenessMark from './FinenessMark';

const STAGES = [20, 40, 60, 80, 100];
const HARD_DEADLINE_MS = 6000;
const FALLBACK_TIMEOUT_MS = 1250;
const EXIT_MS = 950;

/**
 * Preloader ported from the Tera reference markup and behavior.
 * Brand text adapted to Fineness. Runs on every full page load:
 * no session skip, so refresh always replays the intro.
 * Stages 20/40/60/80/100 across DOM ready, fonts, logo, header,
 * and a 1250ms fallback timeout. Hard deadline 6000ms. Esc skips.
 * Focus trapped while visible.
 */
export default function Preloader({ edition = '2026-10' }: { edition?: string }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const timersAtStart = timers.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRemoved(true);
      try {
        window.dispatchEvent(new Event('fineness:ready'));
      } catch {
        // Event dispatch unavailable. Hero falls back to its timeout.
      }
      return;
    }
    setVisible(true);
    setProgress(STAGES[0]);

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, reduce ? 0 : ms);
      timers.current.push(id);
    };

    const finish = () => {
      setProgress(100);
      setExiting(true);
      try {
        window.dispatchEvent(new Event('fineness:ready'));
      } catch {
        // Event dispatch unavailable. Hero falls back to its timeout.
      }
      later(() => {
        setRemoved(true);
      }, EXIT_MS);
    };

    // Staged progress: DOM, fonts, logo, header, fallback timeout.
    later(() => setProgress(STAGES[1]), 150);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => setProgress(STAGES[2])).catch(() => {});
    } else {
      later(() => setProgress(STAGES[2]), 350);
    }
    later(() => setProgress(STAGES[3]), 650);
    later(() => setProgress(STAGES[4]), 900);
    later(finish, FALLBACK_TIMEOUT_MS);
    const hard = window.setTimeout(finish, HARD_DEADLINE_MS);
    timers.current.push(hard);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        timers.current.forEach((t) => window.clearTimeout(t));
        finish();
      }
      // Tab trap while the preloader covers the page.
      if (e.key === 'Tab' && rootRef.current) {
        const focusables = rootRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) finish();
    };
    window.addEventListener('pageshow', onPageShow);

    return () => {
      timersAtStart.forEach((t) => window.clearTimeout(t));
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  if (!visible || removed) return null;

  const title = 'Fineness';
  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading Fineness"
      className={`tera-preloader${exiting ? ' is-exiting' : ''}`}
    >
      <div className="tera-load-shutters" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} style={{ '--i': i } as CSSProperties} />
        ))}
      </div>
      <div className="tera-load-top flex items-center gap-2">
        <FinenessMark size={16} color="var(--gold)" />
        <span className="tera-load-brand">FINENESS</span>
        <span className="tera-load-edition">Edition {edition}</span>
      </div>
      <div className="tera-load-center">
        <div className="tera-load-mark" aria-hidden="true">
          <FinenessMark size={64} color="var(--gold)" className="tera-load-svg-mark" />
        </div>
        <p className="tera-load-title" aria-hidden="true">
          {title.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              {ch}
            </span>
          ))}
        </p>
        <p className="tera-load-subtitle">Tokenized venue register</p>
        <div
          className="tera-load-track"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-hidden="true"
        >
          {[1, 2, 3, 4, 5].map((step) => (
            <i key={step} data-active={String(progress >= step * 20)} />
          ))}
        </div>
        <div className="tera-load-readout">
          <span>Scoring 0-1000</span>
          <span className="tera-load-percent">
            {String(progress).padStart(2, '0')} / 100
          </span>
        </div>
      </div>
      <div className="tera-load-bottom">
        <span>Editorial judgement, not audits</span>
        <button
          type="button"
          onClick={() => {
            setProgress(100);
            setExiting(true);
            try {
              window.dispatchEvent(new Event('fineness:ready'));
            } catch {
              // Event dispatch unavailable. Hero falls back to its timeout.
            }
            window.setTimeout(() => {
              setRemoved(true);
            }, EXIT_MS);
          }}
          className="tera-load-skip"
        >
          Enter site ↗
        </button>
      </div>
    </div>
  );
}
