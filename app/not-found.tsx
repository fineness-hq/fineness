import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ShieldAlert } from 'lucide-react';
import Masthead from '../src/site/components/Masthead';
import Footer from '../src/site/components/Footer';
import { LATEST_EDITION } from '../src/site/editions';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--ground)] text-[var(--ink)] flex flex-col justify-between">
      <Masthead edition={LATEST_EDITION.edition} latestEdition={LATEST_EDITION.edition} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 font-mono text-xs font-bold text-red-600 mb-6 shadow-2xs">
            <ShieldAlert size={14} />
            <span>DISQUALIFIED RECORD // 404 UNCHARTED</span>
          </div>

          <div className="font-mono text-7xl sm:text-8xl font-black text-[var(--ink)] tracking-tighter">
            404
          </div>

          <h1 className="mt-4 font-[var(--font-inter)] text-xl sm:text-2xl font-black text-[var(--ink)]">
            Record Not Found in Public Register
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
            The requested venue dossier, edition snapshot, or document hash has not been struck or admitted to the sovereign metallurgical register.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-[var(--dark)] text-white hover:bg-[var(--gold)] transition-colors shadow-md"
            >
              <ArrowLeft size={13} />
              <span>RETURN TO MAIN REGISTER</span>
            </Link>

            <Link
              href="/method"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--gold)] transition-colors shadow-xs"
            >
              <BookOpen size={13} />
              <span>READ ADMISSION METHOD</span>
            </Link>
          </div>

        </div>
      </div>

      <Footer edition={LATEST_EDITION.edition} />
    </main>
  );
}
