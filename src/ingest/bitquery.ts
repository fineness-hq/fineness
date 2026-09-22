// Bitquery contract-level volume queries. Null means nothing published.
// Requires BITQUERY_API_KEY; without it every lookup resolves to null
// instead of failing the run.

import { cleanMetric, fetchJson } from './http';

export interface BitqueryVolume {
  cumulativeVolumeUsd: number | null;
  dailyVolumeUsd: number | null;
}

function apiUrl(): string {
  const env = process.env['BITQUERY_API_URL'];
  return typeof env === 'string' && env.length > 0
    ? env
    : 'https://streaming.bitquery.io/graphql';
}

interface VolumePayload {
  data?: {
    EVM?: {
      DEXTrades?: { volumeUsd?: number; dayVolumeUsd?: number }[];
    }[];
  };
}

/** Fetch volume for factory contracts. Null when unpublished or unconfigured. */
export async function fetchBitqueryVolume(
  addresses: string[],
): Promise<BitqueryVolume> {
  const key = process.env['BITQUERY_API_KEY'];
  if (typeof key !== 'string' || key.length === 0 || addresses.length === 0) {
    return { cumulativeVolumeUsd: null, dailyVolumeUsd: null };
  }
  const query = `query($factories: [String!]) { EVM(network: {factories: $factories}) { DEXTrades { volumeUsd dayVolumeUsd } } }`;
  const raw = (await fetchJson(apiUrl(), {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({ query, variables: { factories: addresses } }),
  })) as VolumePayload | null;
  const rows = raw?.data?.EVM?.flatMap((n) => n.DEXTrades ?? []) ?? [];
  const cumulative = rows.reduce<number | null>(
    (acc, r) => (acc ?? 0) + (typeof r.volumeUsd === 'number' ? r.volumeUsd : 0),
    rows.length > 0 ? 0 : null,
  );
  const daily = rows.reduce<number | null>(
    (acc, r) => (acc ?? 0) + (typeof r.dayVolumeUsd === 'number' ? r.dayVolumeUsd : 0),
    rows.length > 0 ? 0 : null,
  );
  return { cumulativeVolumeUsd: cleanMetric(cumulative), dailyVolumeUsd: cleanMetric(daily) };
}
