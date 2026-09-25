'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Copy, ShieldAlert } from 'lucide-react';
import type { ScoreMove, AdmissionItem } from '../../../app/desk/page';

interface DeskClientProps {
  edition: string;
  published: string;
  dataAsOf: string;
  snapshotHash: string;
  basis: string | null;
  venueCount: number;
  peak: number;
  moves: ScoreMove[];
  admission: AdmissionItem[];
  scope: string | null;
  warnings: string[];
}

const RUNBOOK = [
  { day: 'Day 1', step: 'Automated pull, snapshot written and committed' },
  { day: 'Day 2–3', step: 'Admission review against the 4 conditions' },
  { day: 'Day 4–6', step: 'Score review: every move cited, two sign-offs' },
  { day: 'Day 7', step: 'Freeze: hash recorded, deltas computed' },
  { day: 'Day 8', step: 'Publish page + JSON, acceptance green' },
];

function usePersistedSet(key: string) {
  const [set, setSet] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set<string>();
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) return new Set(JSON.parse(raw) as string[]);
    } catch {
      /* fresh desk */
    }
    return new Set<string>();
  });
  function toggle(id: string) {
    setSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(key, JSON.stringify([...next]));
      } catch {
        /* private mode */
      }
      return next;
    });
  }
  return { set, toggle } as const;
}

/** Internal review desk: runbook, moves, admission, sign-off. Unlinked publicly. */
export default function DeskClient(props: DeskClientProps) {
  const { edition } = props;
  const runbook = usePersistedSet(`desk:${edition}:runbook`);
  const approvals = usePersistedSet(`desk:${edition}:approvals`);
  const [revA, setRevA] = useState('');
  const [revB, setRevB] = useState('');
  const [copied, setCopied] = useState(false);

  const moveKeys = props.moves.map((m) => `${m.id}:${m.criterion}`);
  const approvedCount = moveKeys.filter((k) => approvals.set.has(k)).length;
  const allApproved = moveKeys.length > 0 && approvedCount === moveKeys.length;
  const canSign = allApproved && revA.trim() && revB.trim() && revA.trim() !== revB.trim();

  const commitMsg = `chore: edition ${edition} review sign-off

moves reviewed: ${approvedCount}/${moveKeys.length}
reviewers: ${revA.trim()}, ${revB.trim()}
basis: ${props.basis ?? 'genesis'}`;

  async function copyCommit() {
    try {
      await navigator.clipboard.writeText(commitMsg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-12">
      <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">
        Internal · not indexed · not linked
      </p>
      <h1 className="mt-4 font-[var(--font-inter)] text-4xl font-extrabold tracking-tight text-[var(--ink)]">
        Editorial Desk
      </h1>
      <p className="mono mt-2 text-xs text-[var(--ink-3)]">
        Edition {props.edition} · published {props.published} · data as of {props.dataAsOf} ·{' '}
        {props.venueCount} venues · peak {props.peak} · basis {props.basis ?? 'genesis'}
      </p>
      <p className="mono mt-1 break-all text-[11px] text-[var(--ink-3)]">{props.snapshotHash}</p>

      {/* Runbook checklist */}
      <section aria-labelledby="desk-runbook" className="mt-10">
        <h2 id="desk-runbook" className="font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]">
          Runbook
        </h2>
        <ul className="mt-4 border border-[var(--rule)] bg-[var(--surface)]">
          {RUNBOOK.map((r) => {
            const done = runbook.set.has(r.day);
            return (
              <li key={r.day} className="border-b border-[var(--rule)] last:border-0">
                <button
                  type="button"
                  onClick={() => runbook.toggle(r.day)}
                  aria-pressed={done}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <span
                    className={`mono flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] font-bold ${
                      done ? 'border-[var(--ok)] bg-[var(--ok)] text-white' : 'border-[var(--rule-2)] text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                  <span className="mono text-xs font-bold text-[var(--ink)]">{r.day}</span>
                  <span className={`text-sm ${done ? 'text-[var(--ink-3)] line-through' : 'text-[var(--ink-2)]'}`}>
                    {r.step}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Score moves */}
      <section aria-labelledby="desk-moves" className="mt-10">
        <h2 id="desk-moves" className="font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]">
          Score moves ({approvedCount}/{moveKeys.length} approved)
        </h2>
        {props.moves.length === 0 ? (
          <p className="prose mt-3 text-sm text-[var(--ink-2)]">
            No moves vs {props.basis ?? 'genesis'}. Steady edition, nothing to approve.
          </p>
        ) : (
          <ul className="mt-4 border border-[var(--rule)] bg-[var(--surface)]">
            {props.moves.map((m) => {
              const key = `${m.id}:${m.criterion}`;
              const ok = approvals.set.has(key);
              return (
                <li key={key} className="border-b border-[var(--rule)] last:border-0">
                  <button
                    type="button"
                    onClick={() => approvals.toggle(key)}
                    aria-pressed={ok}
                    className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 text-left"
                  >
                    <span
                      className={`mono flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] font-bold ${
                        ok ? 'border-[var(--ok)] bg-[var(--ok)] text-white' : 'border-[var(--rule-2)] text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <span className="font-[var(--font-inter)] text-sm font-bold text-[var(--ink)]">{m.name}</span>
                    <span className="mono text-xs text-[var(--ink-2)]">
                      {m.criterion}: {m.from} → {m.to}
                    </span>
                    {!m.rationaleChanged && (
                      <span className="mono rounded bg-red-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-red-600">
                        rationale unchanged
                      </span>
                    )}
                    {Math.abs(m.to - m.from) > 1 && (
                      <span className="mono rounded bg-red-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-red-600">
                        beyond ±1
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {props.warnings.length > 0 && (
          <ul className="mt-3 space-y-1">
            {props.warnings.map((w) => (
              <li key={w} className="mono flex items-start gap-2 text-xs text-[var(--band-none)]">
                <ShieldAlert size={13} className="mt-0.5 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Admission */}
      <section aria-labelledby="desk-admission" className="mt-10">
        <h2 id="desk-admission" className="font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]">
          Admission
        </h2>
        {props.admission.length === 0 && !props.scope ? (
          <p className="prose mt-3 text-sm text-[var(--ink-2)]">
            No standard-era failures. Edition 01 venues are grandfathered.
          </p>
        ) : (
          <ul className="mt-4 space-y-1">
            {props.admission.map((a) =>
              a.failed.map((reason) => (
                <li key={a.id + reason} className="mono flex items-start gap-2 text-xs text-[var(--band-none)]">
                  <ShieldAlert size={13} className="mt-0.5 shrink-0" />
                  {a.id}: {reason}
                </li>
              )),
            )}
            {props.scope && <li className="mono text-xs text-[var(--warn)]">{props.scope}</li>}
          </ul>
        )}
      </section>

      {/* Sign-off */}
      <section aria-labelledby="desk-signoff" className="mt-10">
        <h2 id="desk-signoff" className="font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]">
          Sign-off
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { label: 'Reviewer 1', value: revA, set: setRevA },
            { label: 'Reviewer 2', value: revB, set: setRevB },
          ].map((r) => (
            <div key={r.label}>
              <label htmlFor={`desk-${r.label}`} className="mono text-xs uppercase tracking-widest text-[var(--ink-2)]">
                {r.label}
              </label>
              <input
                id={`desk-${r.label}`}
                type="text"
                value={r.value}
                onChange={(e) => r.set(e.target.value)}
                placeholder="HANDLE"
                className="mono mt-1 w-full border border-[var(--rule)] bg-[var(--surface)] px-3 py-2.5 text-xs uppercase tracking-widest text-[var(--ink)] placeholder:text-[var(--ink-3)]"
              />
            </div>
          ))}
        </div>
        <pre className="mono mt-4 overflow-x-auto whitespace-pre-wrap rounded border border-[var(--rule)] bg-[var(--surface-alt)] p-4 text-xs leading-relaxed text-[var(--ink)]">
          {commitMsg}
        </pre>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copyCommit}
            disabled={!canSign}
            className="mono inline-flex min-h-[44px] items-center gap-1.5 rounded bg-[var(--dark)] px-5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy commit message'}
          </button>
          {!canSign && (
            <p className="mono text-xs text-[var(--ink-3)]">
              Approve all moves + two distinct reviewers to unlock.
            </p>
          )}
        </div>
        <p className="mt-6 text-sm text-[var(--ink-2)]">
          <Link href="/" className="underline-offset-4 hover:underline">
            ← Back to register
          </Link>
        </p>
      </section>
    </main>
  );
}
