'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging
    console.error('Unhandled route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--ground)] text-[var(--ink)] flex flex-col justify-center items-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-700 mb-6 shadow-2xs">
          <AlertTriangle size={14} />
          <span>RUNTIME EXCEPTION // CIRCUIT BREAKER</span>
        </div>

        <div className="font-mono text-6xl sm:text-7xl font-black text-[var(--ink)] tracking-tighter">
          500
        </div>

        <h1 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)]">
          Application Render Interrupted
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
          A temporary state mismatch or network interruption prevented this view from completing its cycle.
        </p>

        {error.digest && (
          <p className="mt-2 font-mono text-[11px] text-[var(--ink-3)]">
            Digest: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={() => reset()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-[var(--ink)] text-white hover:bg-black transition-colors shadow-md cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>RETRY VIEW</span>
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--gold)] transition-colors shadow-xs"
          >
            <ArrowLeft size={13} />
            <span>RETURN TO REGISTER</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
