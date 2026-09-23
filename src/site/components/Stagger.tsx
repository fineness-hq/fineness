'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** True once the element enters the viewport (80px margin). Never resets. */
function useInViewOnce<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only fallback, no IO support
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}

function useReduced(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  return reduce;
}

/** Word-by-word emerge, like the reference split-text effect. */
export function WordText({ text, className }: { text: string; className?: string }) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();
  const reduce = useReduced();
  const show = reduce || inView;
  const words = text.split(' ');
  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      data-words={show ? 'show' : 'hidden'}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="w" style={{ '--wi': i } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

interface StaggerListProps {
  children: ReactNode;
  className?: string;
  /** Drive by boolean (menus) instead of scroll position. */
  open?: boolean;
}

/** Sequential fade for list children. Scroll-driven by default. */
export function StaggerList({ children, className, open }: StaggerListProps) {
  const [ref, inView] = useInViewOnce<HTMLUListElement>();
  const reduce = useReduced();
  const show = reduce || (open === undefined ? inView : open);
  return (
    <ul ref={ref} className={className} data-words={show ? 'show' : 'hidden'}>
      {children}
    </ul>
  );
}

/** Child wrapper for StaggerList items. Renders an li. */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li className={className}>
      <span className="w">{children}</span>
    </li>
  );
}

/** Logo/lockup slide from the left. Bundle: x -392 spring 0.6s. */
export function XSlide({
  children,
  className,
  inView = false,
}: {
  children: ReactNode;
  className?: string;
  inView?: boolean;
}) {
  const [ref, seen] = useInViewOnce<HTMLSpanElement>();
  const reduce = useReduced();
  const show = reduce || !inView || seen;
  return (
    <span ref={ref} className={className} data-xslide={show ? 'show' : 'hidden'}>
      {children}
    </span>
  );
}
