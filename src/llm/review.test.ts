import { afterEach, describe, expect, it, vi } from 'vitest';
import { complete, llmConfig } from './client';
import { reviewEdition } from './review';
import edition09Json from '../../data/editions/2026-09.json';
import snapshot09Json from '../../data/snapshots/2026-09-01.json';
import type { Edition, Snapshot } from '../types';

const prev = edition09Json as unknown as Edition;
const snapshot = snapshot09Json as unknown as Snapshot;
const cfg = { url: 'https://llm.test/v1', key: 'k', model: 'm' };

function replyFor(venues: Record<string, object>): Response {
  return {
    ok: true,
    json: async () => ({
      choices: [{ message: { content: JSON.stringify({ venues, watchlist: [], notes: [] }) } }],
    }),
  } as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env['LLM_API_URL'];
  delete process.env['LLM_API_KEY'];
  delete process.env['LLM_MODEL'];
});

describe('llmConfig', () => {
  it('null without credentials', () => {
    const saved = {
      url: process.env['LLM_API_URL'],
      key: process.env['LLM_API_KEY'],
      model: process.env['LLM_MODEL'],
    };
    delete process.env['LLM_API_URL'];
    delete process.env['LLM_API_KEY'];
    delete process.env['LLM_MODEL'];
    try {
      expect(llmConfig()).toBeNull();
    } finally {
      if (saved.url !== undefined) process.env['LLM_API_URL'] = saved.url;
      if (saved.key !== undefined) process.env['LLM_API_KEY'] = saved.key;
      if (saved.model !== undefined) process.env['LLM_MODEL'] = saved.model;
    }
  });

  it('reads config from env', () => {
    process.env['LLM_API_URL'] = 'https://llm.test/v1';
    process.env['LLM_API_KEY'] = 'k';
    process.env['LLM_MODEL'] = 'm';
    expect(llmConfig()).toEqual({ url: 'https://llm.test/v1', key: 'k', model: 'm' });
  });
});

describe('complete', () => {
  it('null on upstream failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));
    await expect(complete(cfg, 's', 'u')).resolves.toBeNull();
  });
});

describe('reviewEdition', () => {
  it('clamps wild moves to ±1 and requires rewritten rationale', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        replyFor({
          pons: {
            scores: { asset: 10, traction: 10, transparency: 8, compliance: 5, durability: 8 },
            rationale: {
              asset: 'Fresh stock-pair expansion cited.',
              traction: 'Top daily volume venue with the densest pool activity in the observation window.',
              transparency: 'Verified contracts, public inventory snapshots, and a named operating entity.',
              compliance: 'Standard token disclaimers only, with no prospectus or license cited.',
              durability: 'Two years live with consistent uptime and steadily growing liquidity.',
            },
            thesis: 'Pons moves flow.',
            status: 'active',
            strikeReason: null,
          },
        }),
      ),
    );
    const review = await reviewEdition(cfg, prev, snapshot);
    expect(review).not.toBeNull();
    // 5 -> 10 clamped to 6, rationale rewritten so it applies.
    expect(review?.venues['pons'].scores.asset).toBe(6);
    // traction proposed 10 equals previous 10: unchanged.
    expect(review?.venues['pons'].scores.traction).toBe(10);
    // Untouched venues carry previous scores.
    expect(review?.venues['csl'].scores).toEqual(prev.venues.find((v) => v.id === 'csl')?.scores);
  });

  it('null on garbage replies so the run carries forward', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ choices: [{ message: { content: 'nope' } }] }) } as Response),
    );
    await expect(reviewEdition(cfg, prev, snapshot)).resolves.toBeNull();
  });
});
