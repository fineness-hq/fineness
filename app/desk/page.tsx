import type { Metadata } from 'next';
import { CRITERIA } from '../../src/scoring/fineness';
import { checkAdmission, scopeNote } from '../../src/build/admission';
import { warnScoreMoves } from '../../src/build/score-moves';
import { EDITIONS, LATEST_EDITION } from '../../src/site/editions';
import DeskClient from '../../src/site/components/DeskClient';

export const metadata: Metadata = {
  title: 'Fineness : Editorial Desk (internal)',
  description: 'Internal review desk. Not linked publicly.',
  robots: { index: false, follow: false },
};

export interface ScoreMove {
  id: string;
  name: string;
  criterion: string;
  from: number;
  to: number;
  rationaleChanged: boolean;
}

export interface AdmissionItem {
  id: string;
  failed: string[];
}

/**
 * Internal editorial desk. Server computes everything from frozen
 * editions; the client island only tracks review state. Unlinked from
 * navigation and excluded from indexing.
 */
export default function DeskPage() {
  const prev = EDITIONS.length > 1 ? EDITIONS[EDITIONS.length - 2] : null;
  const curr = LATEST_EDITION;
  const priorById = new Map((prev?.venues ?? []).map((v) => [v.id, v]));

  const moves: ScoreMove[] = [];
  for (const v of curr.venues) {
    const p = priorById.get(v.id);
    if (!p) continue;
    for (const c of CRITERIA) {
      if (v.scores[c] !== p.scores[c]) {
        moves.push({
          id: v.id,
          name: v.name,
          criterion: c,
          from: p.scores[c],
          to: v.scores[c],
          rationaleChanged: p.rationale[c] !== v.rationale[c],
        });
      }
    }
  }

  return (
    <DeskClient
      edition={curr.edition}
      published={curr.published}
      dataAsOf={curr.dataAsOf}
      snapshotHash={curr.snapshotHash}
      basis={prev?.edition ?? null}
      venueCount={curr.venues.length}
      peak={Math.max(...curr.venues.map((v) => v.fineness))}
      moves={moves}
      admission={checkAdmission(curr.venues)}
      scope={scopeNote(curr.venues)}
      warnings={prev ? warnScoreMoves(curr, prev) : []}
    />
  );
}
