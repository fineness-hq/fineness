'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const LINKS: Array<[string, string, string]> = [
  ['01', 'Home', '/'],
  ['02', 'Register', '/#register'],
  ['03', 'Scale', '/#scale'],
  ['04', 'Comparison', '/#comparison'],
  ['05', 'Method', '/method'],
  ['06', 'Machine JSON', '/editions/2026-10.json'],
  ['07', 'Sources', '/#sources'],
];

/** Dark menu button + slide-in overlay panel with numbered links. */
export default function MenuButton() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-menu"
        className="tera-menu-btn"
      >
        <span>{open ? 'CLOSE' : 'MENU'}</span>
        <span className="tera-burger" aria-hidden="true">
          <span className={open ? 'tera-burger-x1' : ''} />
          <span className={open ? 'tera-burger-x2' : ''} />
        </span>
      </button>
      <div id="site-menu" className={`tera-overlay${open ? ' tera-overlay-open' : ''}`} aria-hidden={!open}>
        <button type="button" aria-label="Close menu" onClick={close} tabIndex={open ? 0 : -1} className="tera-overlay-scrim" />
        <nav aria-label="Site menu" className="tera-panel">
          <p className="tera-panel-eyebrow">Explore Fineness</p>
          <ul>
            {LINKS.map(([n, label, href], i) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
                  tabIndex={open ? 0 : -1}
                  className={`tera-panel-link${i === 0 ? ' tera-panel-active' : ''}`}
                >
                  <span className="tera-panel-num">{n}</span>
                  <span>{label}</span>
                  {i === 0 && <span aria-hidden="true">↗</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div className="tera-panel-foot">
            <Link href="/editions/2026-10.json" onClick={close} tabIndex={open ? 0 : -1} className="tera-panel-json">
              EDITION JSON ↗
            </Link>
            <span className="tera-panel-lang">LANGUAGE&nbsp;&nbsp;EN&nbsp;&nbsp;▾</span>
          </div>
        </nav>
      </div>
    </>
  );
}
