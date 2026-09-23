'use client';

import { useEffect, useRef, useState } from 'react';

const DONE_KEY = 'fineness-preloader-v1';
const LEGACY_KEY = 'tera-preloader-v1';
const STAGES = [20, 40, 60, 80, 100];
const HARD_DEADLINE_MS = 6000;
const FALLBACK_TIMEOUT_MS = 1250;
const EXIT_MS = 950;
const SHUTTER_STAGGER_MS = 65;

/** Return true when the preloader was already seen this session. */
function seenThisSession(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('intro') === '1') return false;
    return (
      window.sessionStorage.getItem(DONE_KEY) === '1' ||
      window.sessionStorage.getItem(LEGACY_KEY) === '1'
    );
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(DONE_KEY, '1');
  } catch {
    // Storage unavailable. Preloader simply runs again next visit.
  }
}

/**
 * Preloader ported from the Tera reference markup and behavior.
 * Brand text adapted to Fineness. Stages 20/40/60/80/100 across
 * DOM ready, fonts, logo, header, and a 1250ms fallback timeout.
 * Hard deadline 6000ms. Esc skips. Focus trapped while visible.
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
    if (seenThisSession()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRemoved(true);
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      markSeen();
      setRemoved(true);
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
        // Event dispatch unavailable. Hero falls back to_SESSION check.
      }
      later(() => {
        setRemoved(true);
        markSeen();
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
      className={exiting ? 'tera-exit' : undefined}
      style={exiting ? { opacity: 0, transform: 'translateY(-12px)' } : undefined}
    >
      <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-[var(--pre-shutter)] p-6">
        <div className="pre-readout flex items-center justify-between text-[var(--pre-muted)]">
          <span>Tokenized venue register</span>
          <span>Edition {edition}</span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="tera-float relative flex h-20 w-20 items-center justify-center">
            <div
              aria-hidden="true"
              className="tera-orbit absolute inset-0 rounded-full border border-dashed"
              style={{ borderColor: 'var(--pre-orbit)' }}
            />
            <span
              aria-hidden="true"
              className="block h-3 w-3 rounded-full"
              style={{ background: 'var(--pre-progress)' }}
            />
          </div>
          <p
            aria-hidden="true"
            className="font-[var(--font-inter)] text-[clamp(64px,9vw,138px)] font-medium leading-none tracking-[-0.065em] text-[var(--pre-ink)]"
            style={{ fontWeight: 450 }}
          >
            {title.split('').map((ch, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {ch}
              </span>
            ))}
          </p>
          <p className="font-[var(--font-inter)] text-[15px] font-semibold text-[var(--pre-ink)]">
            Fineness
          </p>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-[2px] w-56 overflow-hidden bg-[var(--pre-shutter-border)]"
          >
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: 'var(--pre-progress)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <p className="pre-readout text-[var(--pre-muted-2)]">{progress}%</p>
        </div>
        <div className="pre-readout flex items-center justify-between text-[var(--pre-muted-3)]">
          <span>Scoring 0-1000</span>
          <button
            type="button"
            onClick={() => {
              setProgress(100);
              setExiting(true);
              window.setTimeout(() => {
                setRemoved(true);
                markSeen();
              }, EXIT_MS);
            }}
            className="uppercase tracking-[0.15em]"
          >
            Skip
          </button>
        </div>
      </div>
      {/* Shutters. */}
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden="true"
          className="tera-shutter fixed inset-x-0 top-0 z-[99] h-1/2 bg-[var(--pre-shutter)]"
          style={{
            borderBottom: '1px solid var(--pre-shutter-border)',
            transitionDelay: exiting ? `${i * SHUTTER_STAGGER_MS}ms` : '0ms',
            transform: exiting ? 'translateY(-101%)' : 'translateY(0)',
          }}
        />
      ))}
    </div>
  );
}
