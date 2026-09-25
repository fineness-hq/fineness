import { describe, it, expect } from 'vitest';
import { HOUSE_WEIGHTS } from '../scoring/fineness';
import type { Criterion } from '../scoring/fineness';
import type { Edition, Venue } from '../types';
import { buildNextEdition } from './carry';
import { checkAdmission, scopeNote } from './admission';
import { validateEdition } from './validate';
import sourcesJson from '../../data/sources.json';
import type { SourceRegistry } from '../types';

const sources = sourcesJson as unknown as SourceRegistry;

function venue(over: Partial<Venue> = {}): Venue {
  return {
    id: 'test-venue',
    name: 'Test Venue',
    chain: 'test-chain',
    resident: true,
    status: 'active',
    struckDate: null,
    admittedEdition: '2026-10',
    thesis: 'A test venue.',
    scores: { asset: 5, traction: 5, transparency: 5, compliance: 5, durability: 5 },
    fineness: 500,
    band: '9k',
    rank: 1,
    rationale: { asset: 'a', traction: 'b', transparency: 'c', compliance: 'd', durability: 'e' },
    pairing: { assetType: 'tokenized-equity', custodian: 'Test', redeemable: false, verifiability: 'attestation' },
    metrics: {
      cumulativeVolumeUsd: 1000,
      dailyVolumeUsd: 10,
      fees24hUsd: null,
      tvlUsd: null,
      asOf: '2026-09-22',
      sourceIds: ['docs-venue'],
    },
    contracts: [{ label: 'factory', address: '0xabc', verified: true }],
    links: { site: 'https://example.com', docs: null },
    facts: [['1k', 'volume']],
    ...over,
  };
}

function edition(venues: Venue[]): Edition {
  return {
    edition: '2026-10',
    published: '2026-09-22',
    dataAsOf: '2026-09-22',
    snapshotHash: 'sha256:abc',
    houseWeights: { ...HOUSE_WEIGHTS },
    disclosures: [],
    corrections: [],
    venues,
  };
}

describe('admission review (§7)', () => {
  it('flags machine-decidable failures for standard-era admissions', () => {
    const bad = venue({
      id: 'bad',
      pairing: { assetType: 'none', custodian: null, redeemable: false, verifiability: 'none' },
      contracts: [],
      links: { site: null, docs: null },
      metrics: {
        cumulativeVolumeUsd: null,
        dailyVolumeUsd: null,
        fees24hUsd: null,
        tvlUsd: null,
        asOf: '2026-09-22',
        sourceIds: ['docs-venue'],
      },
    });
    const findings = checkAdmission([bad]);
    expect(findings).toHaveLength(1);
    expect(findings[0].failed.join(' ')).toMatch(/C1/);
    expect(findings[0].failed.join(' ')).toMatch(/C2/);
    expect(findings[0].failed.join(' ')).toMatch(/C4/);
  });

  it('grandfathers Edition 01 venues and passes clean records', () => {
    const old = venue({ id: 'old', admittedEdition: '2026-09', contracts: [] });
    expect(checkAdmission([old])).toEqual([]);
    expect(checkAdmission([venue({ id: 'good' })])).toEqual([]);
  });

  it('flags the watchlist split at three off-chain venues', () => {
    const off = (id: string) => venue({ id, resident: false });
    expect(scopeNote([venue({ id: 'a' }), off('b')])).toBeNull();
    expect(scopeNote([off('a'), off('b'), off('c')])).toMatch(/split threshold/);
  });
});

describe('carry embeds deltas and struck dates (§9)', () => {
  const prev = edition([
    venue({ id: 'a', scores: { asset: 5, traction: 5, transparency: 5, compliance: 5, durability: 5 }, fineness: 500, band: '9k', rank: 1 }),
    venue({ id: 'b', scores: { asset: 4, traction: 4, transparency: 4, compliance: 4, durability: 4 }, fineness: 400, band: '9k', rank: 2 }),
  ]);
  const snapshot = {
    snapshot: '2026-10-01',
    asOf: '2026-10-01',
    venues: prev.venues.map((v) => ({
      id: v.id,
      cumulativeVolumeUsd: v.metrics.cumulativeVolumeUsd,
      dailyVolumeUsd: v.metrics.dailyVolumeUsd,
      fees24hUsd: v.metrics.fees24hUsd,
      tvlUsd: v.metrics.tvlUsd,
      contracts: v.contracts,
    })),
  };

  it('attaches house-weight deltas with basis', () => {
    const next = buildNextEdition(prev, snapshot, {}, {
      edition: '2026-11',
      published: '2026-10-08',
      dataAsOf: '2026-10-01',
      snapshotHash: 'sha256:x',
    }, null);
    for (const v of next.venues) {
      expect(v.delta?.basis).toBe('2026-10');
      expect(v.struckDate).toBeNull();
    }
    expect(next.venues.find((v) => v.id === 'a')?.delta).toMatchObject({ fineness: 0, rank: 0 });
    expect(next.venues.find((v) => v.id === 'b')?.delta).toMatchObject({ fineness: 0, rank: 0 });
    expect(() => validateEdition(next, sources)).not.toThrow();
  });

  it('records struckDate on a new strike and clears on return', () => {
    const mkReview = (status: 'struck' | 'active') => ({
      venues: Object.fromEntries(
        prev.venues.map((v) => [
          v.id,
          {
            scores: { ...v.scores },
            rationale: { ...v.rationale } as Record<Criterion, string>,
            thesis: v.thesis,
            status,
            strikeReason: status === 'struck' ? 'dark interface' : null,
            watchlist: [],
          },
        ]),
      ),
      notes: [],
    });
    const struck = buildNextEdition(prev, snapshot, {}, {
      edition: '2026-11', published: '2026-10-08', dataAsOf: '2026-10-01', snapshotHash: 'sha256:x',
    }, mkReview('struck'));
    for (const v of struck.venues) expect(v.struckDate).toBe('2026-10-01');
    expect(() => validateEdition(struck, sources)).not.toThrow();
  });
});

describe('prelaunch holding pen (brief §16 Q3)', () => {
  const prev = edition([
    venue({ id: 'a', fineness: 500, band: '9k', rank: 1 }),
    venue({ id: 'b', fineness: 400, band: '9k', rank: 2 }),
    venue({ id: 'c', status: 'prelaunch', fineness: 220, band: 'below-hallmark', rank: 0 }),
  ]);
  const snapshot = {
    snapshot: '2026-10-01',
    asOf: '2026-10-01',
    venues: prev.venues.map((v) => ({
      id: v.id,
      cumulativeVolumeUsd: v.metrics.cumulativeVolumeUsd,
      dailyVolumeUsd: v.metrics.dailyVolumeUsd,
      fees24hUsd: v.metrics.fees24hUsd,
      tvlUsd: v.metrics.tvlUsd,
      contracts: v.contracts,
    })),
  };

  it('lists prelaunch venues unscored and unranked, last', () => {
    const next = buildNextEdition(prev, snapshot, {}, {
      edition: '2026-11', published: '2026-10-08', dataAsOf: '2026-10-01', snapshotHash: 'sha256:x',
    }, null);
    expect(next.venues.map((v) => v.id)).toEqual(['a', 'b', 'c']);
    expect(next.venues.map((v) => v.rank)).toEqual([1, 2, 0]);
    expect(next.venues.find((v) => v.id === 'c')?.delta).toBeUndefined();
    expect(() => validateEdition(next, sources)).not.toThrow();
  });

  it('rejects ranked prelaunch records', () => {
    const bad = edition([venue({ status: 'prelaunch', rank: 3 })]);
    expect(() => validateEdition(bad, sources)).toThrow(/unranked/);
  });
});
describe('validate new fields', () => {
  it('rejects struck/status mismatch and bad corrections', () => {
    const badDate = edition([venue({ status: 'struck', struckDate: 'tomorrow' })]);
    expect(() => validateEdition(badDate, sources)).toThrow(/struckDate/);
    const mismatch = edition([venue({ status: 'active', struckDate: '2026-10-01' })]);
    expect(() => validateEdition(mismatch, sources)).toThrow(/struck/);
    const badCorr = edition([venue()]);
    badCorr.corrections = [{ date: '2026-10-01', note: '', originalFigure: 'x', signedBy: ['r1', 'r2'] }];
    expect(() => validateEdition(badCorr, sources)).toThrow(/correction/);
    const unsigned = edition([venue()]);
    unsigned.corrections = [{ date: '2026-10-01', note: 'fix', originalFigure: 'x', signedBy: ['r1'] }];
    expect(() => validateEdition(unsigned, sources)).toThrow(/sign-off/);
    const signed = edition([venue()]);
    signed.corrections = [{ date: '2026-10-01', note: 'fix', originalFigure: 'x', signedBy: ['r1', 'r2'] }];
    expect(() => validateEdition(signed, sources)).not.toThrow();
  });
});
