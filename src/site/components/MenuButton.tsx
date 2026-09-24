'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { StaggerItem, StaggerList } from './Stagger';

const LINKS: Array<[string, string, string]> = [
  ['AU', 'Home', '/'],
  ['REG', 'Register', '/#register'],
  ['SCALE', 'Scale', '/#scale'],
  ['ASSAY', 'Comparison', '/#comparison'],
  ['CANON', 'Method', '/method'],
  ['JSON', 'Machine JSON', '/editions/2026-10.json'],
  ['PROV', 'Sources', '/#sources'],
];

/** Dark menu button + slide-in overlay panel with numbered links. */
export default function MenuButton({ latestEdition = '2026-10' }: { latestEdition?: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const links: Array<[string, string, string]> = LINKS.map((l) =>
    l[1] === 'Machine JSON' ? [l[0], l[1], `/editions/${latestEdition}.json`] : l,
  );

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
          <StaggerList open={open}>
            {links.map(([n, label, href], i) => (
              <StaggerItem key={href}>
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
              </StaggerItem>
            ))}
          </StaggerList>
          <div className="tera-panel-foot">
            <Link href={`/editions/${latestEdition}.json`} onClick={close} tabIndex={open ? 0 : -1} className="tera-panel-json">
              EDITION JSON ↗
            </Link>
            <span className="tera-panel-lang">LANGUAGE&nbsp;&nbsp;EN&nbsp;&nbsp;▾</span>
          </div>
        </nav>
      </div>
    </>
  );
}
