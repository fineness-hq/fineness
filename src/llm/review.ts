// AI analyst + editor. The model proposes; code disposes:
// every proposal is re-checked here (integer range, ±1 cap per criterion,
// changed rationale for every move, known venue ids only). Anything invalid
// falls back to carried values, so a wild model can never corrupt an
// edition. Admission verdicts are limited to retain/strike; new venues are
// reported as watchlist because full records cannot be fabricated.

import { CRITERIA, type Criterion } from '../scoring/fineness';
import type { Edition, Snapshot, VenueStatus } from '../types';
import { complete, type LlmConfig } from './client';

export interface VenueReview {
  scores: Record<Criterion, number>;
  rationale: Record<Criterion, string>;
  thesis: string;
  status: VenueStatus;
  strikeReason: string | null;
  watchlist: string[];
}

export interface EditionReview {
  venues: Record<string, VenueReview>;
  notes: string[];
}

interface RawReview {
  scores?: Partial<Record<string, unknown>>;
  rationale?: Partial<Record<string, string>>;
  thesis?: string;
  status?: string;
  strikeReason?: string | null;
}

const VALID_STATUS: VenueStatus[] = ['active', 'prelaunch', 'paused', 'struck'];

function isStatus(s: unknown): s is VenueStatus {
  return typeof s === 'string' && (VALID_STATUS as string[]).includes(s);
}

function clampMove(from: number, proposed: unknown): number {
  if (typeof proposed !== 'number' || !Number.isInteger(proposed)) return from;
  const bounded = Math.min(10, Math.max(0, proposed));
  return Math.min(from + 1, Math.max(from - 1, bounded));
}

const SYSTEM = `You are the scoring analyst and admission editor of Fineness, a monthly register ranking tokenized-asset venues 0-1000.
Rules, no exceptions:
- Scores are integers 0..10 on: asset, traction, transparency, compliance, durability.
- A score may move at most 1 point from its previous value per venue per criterion.
- Every moved score MUST have a rewritten rationale citing fresh evidence. Unchanged scores keep prior text.
- Admission: verdict retain or struck per venue with a one-line reason. Never invent a new venue.
- Reply with ONLY a JSON object, no prose, no fences. Schema:
{"venues": {"<id>": {"scores": {"asset": n, "traction": n, "transparency": n, "compliance": n, "durability": n}, "rationale": {"asset": "...", "traction": "...", "transparency": "...", "compliance": "...", "durability": "..."}, "thesis": "...", "status": "active|prelaunch|paused|struck", "strikeReason": null}}, "watchlist": ["..."], "notes": ["..."]}`;

function buildPrompt(prev: Edition, snapshot: Snapshot): string {
  const snapById = new Map(snapshot.venues.map((v) => [v.id, v]));
  const lines = prev.venues.map((v) => {
    const s = snapById.get(v.id);
    return [
      `## ${v.id} (${v.name}, ${v.chain}, status ${v.status})`,
      `scores: ${CRITERIA.map((c) => `${c}=${v.scores[c]}`).join(' ')}`,
      `rationale: ${CRITERIA.map((c) => `${c}="${v.rationale[c]}"`).join(' | ')}`,
      `thesis: "${v.thesis}"`,
      `pairing: ${v.pairing.assetType}, custodian ${v.pairing.custodian ?? 'none'}, redeemable ${v.pairing.redeemable}, ${v.pairing.verifiability}`,
      `fresh metrics: cumulative ${s?.cumulativeVolumeUsd ?? 'null'}, daily ${s?.dailyVolumeUsd ?? 'null'}, fees24h ${s?.fees24hUsd ?? 'null'}, tvl ${s?.tvlUsd ?? 'null'}`,
      `facts: ${v.facts.map((f) => f.join(' ')).join(' ; ')}`,
    ].join('\n');
  });
  return [
    `Edition ${prev.edition} register under review. Fresh snapshot asOf ${snapshot.asOf}.`,
    ...lines,
    'Review every venue: move scores only on fresh evidence above, keep the rest. Return the JSON object.',
  ].join('\n\n');
}

function extractJson(reply: string): unknown | null {
  const start = reply.indexOf('{');
  const end = reply.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(reply.slice(start, end + 1)) as unknown;
  } catch {
    return null;
  }
}

/** Run the AI review. Returns null when the model is unusable; the caller
 *  then carries the previous edition unchanged. */
export async function reviewEdition(
  cfg: LlmConfig,
  prev: Edition,
  snapshot: Snapshot,
): Promise<EditionReview | null> {
  const prompt = buildPrompt(prev, snapshot);
  // Full-register JSON needs headroom: tight caps clip the tail and void
  // the whole review.
  let reply = await complete(cfg, SYSTEM, prompt, 12000);
  if (reply == null) return null;
  let parsed = extractJson(reply);
  if (parsed == null) {
    reply = await complete(cfg, SYSTEM, `${prompt}\n\nReply with ONLY the JSON object.`, 12000);
    if (reply == null) return null;
    parsed = extractJson(reply);
    if (parsed == null) return null;
  }
  const root = parsed as {
    venues?: Record<string, RawReview>;
    watchlist?: unknown;
    notes?: unknown;
  };
  if (typeof root.venues !== 'object' || root.venues === null) return null;

  const venues: Record<string, VenueReview> = {};
  for (const v of prev.venues) {
    const raw = root.venues[v.id];
    if (typeof raw !== 'object' || raw === null) {
      venues[v.id] = {
        scores: { ...v.scores },
        rationale: { ...v.rationale },
        thesis: v.thesis,
        status: v.status,
        strikeReason: null,
        watchlist: [],
      };
      continue;
    }
    const scores = { ...v.scores };
    const rationale = { ...v.rationale };
    const proposedScores =
      typeof raw.scores === 'object' && raw.scores !== null ? raw.scores : {};
    for (const c of CRITERIA) {
      const moved = clampMove(v.scores[c], proposedScores[c]);
      const text = raw.rationale?.[c];
      if (moved !== v.scores[c] && typeof text === 'string' && text.trim().length > 0) {
        scores[c] = moved;
        rationale[c] = text.trim();
      }
    }
    const status = isStatus(raw.status) ? raw.status : v.status;
    venues[v.id] = {
      scores,
      rationale,
      thesis:
        typeof raw.thesis === 'string' && raw.thesis.trim().length > 0
          ? raw.thesis.trim()
          : v.thesis,
      status,
      strikeReason:
        status === 'struck' && typeof raw.strikeReason === 'string'
          ? raw.strikeReason
          : null,
      watchlist: [],
    };
  }
  const watchlist = Array.isArray(root.watchlist)
    ? root.watchlist.filter((w): w is string => typeof w === 'string').slice(0, 10)
    : [];
  const notes = Array.isArray(root.notes)
    ? root.notes.filter((n): n is string => typeof n === 'string').slice(0, 20)
    : [];
  return { venues, notes: [...notes, ...watchlist.map((w) => `watchlist: ${w}`)] };
}
