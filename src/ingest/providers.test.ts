import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchBitqueryVolume } from './bitquery';
import { fetchDefillamaStats } from './defillama';
import { fetchContractVerification } from './explorer';
import { cleanMetric, fetchJson } from './http';

function jsonResponse(body: unknown, ok = true): Response {
  return { ok, json: async () => body } as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env['BITQUERY_API_KEY'];
});

describe('fetchJson', () => {
  it('returns null on network failure instead of throwing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));
    await expect(fetchJson('https://example.com')).resolves.toBeNull();
  });

  it('returns null on bad status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, false)));
    await expect(fetchJson('https://example.com')).resolves.toBeNull();
  });
});

describe('cleanMetric', () => {
  it('rejects non-numbers, negatives, and infinities', () => {
    expect(cleanMetric(null)).toBeNull();
    expect(cleanMetric('5')).toBeNull();
    expect(cleanMetric(-1)).toBeNull();
    expect(cleanMetric(Number.POSITIVE_INFINITY)).toBeNull();
    expect(cleanMetric(12.5)).toBe(12.5);
    expect(cleanMetric(0)).toBe(0);
  });
});

describe('fetchDefillamaStats', () => {
  it('takes the last chart points', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(jsonResponse({ totalDataChart: [[1, 10], [2, 9500]] }))
        .mockResolvedValueOnce(jsonResponse({ tvl: [{ totalLiquidityUSD: 100 }, { totalLiquidityUSD: 45000000 }] })),
    );
    await expect(fetchDefillamaStats('pools-trade')).resolves.toEqual({
      fees24hUsd: 9500,
      tvlUsd: 45000000,
    });
  });

  it('returns nulls when the venue is unlisted', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({})));
    await expect(fetchDefillamaStats('nope')).resolves.toEqual({
      fees24hUsd: null,
      tvlUsd: null,
    });
  });
});

describe('fetchBitqueryVolume', () => {
  it('stays null without an API key and never calls the network', async () => {
    const spy = vi.fn();
    vi.stubGlobal('fetch', spy);
    await expect(fetchBitqueryVolume(['0xabc'])).resolves.toEqual({
      cumulativeVolumeUsd: null,
      dailyVolumeUsd: null,
    });
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('fetchContractVerification', () => {
  it('reads the verified flag from blockscout shape', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ result: [{ ABI: '[{"inputs":[]}]' }] })),
    );
    await expect(fetchContractVerification('0xabc')).resolves.toBe(true);
  });

  it('returns null on unknown instead of false', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({})));
    await expect(fetchContractVerification('0xabc')).resolves.toBeNull();
  });
});
