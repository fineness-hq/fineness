'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** True once the element enters the viewport (80px margin). Never resets. */
function useInViewOnce<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(
    () => typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
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
  const [reduce, setReduce] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduce(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
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

/** Table body whose rows cascade in on scroll. */
export function StaggerBody({ children }: { children: ReactNode }) {
  const [ref, inView] = useInViewOnce<HTMLTableSectionElement>();
  const reduce = useReduced();
  const show = reduce || inView;
  return (
    <tbody ref={ref} data-rows={show ? 'show' : 'hidden'}>
      {children}
    </tbody>
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
