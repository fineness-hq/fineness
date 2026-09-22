// DefiLlama fees and TVL endpoints. Null means nothing published.

import { cleanMetric, fetchJson } from './http';

export interface DefillamaStats {
  fees24hUsd: number | null;
  tvlUsd: number | null;
}

interface FeesSummary {
  totalDataChart?: [number, number][];
}

interface Protocol {
  tvl?: { totalLiquidityUSD?: number }[];
}

/** Fetch fees and TVL for one protocol slug. Returns nulls when unpublished. */
export async function fetchDefillamaStats(
  protocol: string,
): Promise<DefillamaStats> {
  const [feesRaw, tvlRaw] = await Promise.all([
    fetchJson(
      `https://api.llama.fi/summary/fees/${encodeURIComponent(protocol)}?dataType=dailyFees`,
    ),
    fetchJson(
      `https://api.llama.fi/protocol/${encodeURIComponent(protocol)}`,
    ),
  ]);
  const chart = (feesRaw as FeesSummary | null)?.totalDataChart;
  const lastFee = Array.isArray(chart) && chart.length > 0 ? chart[chart.length - 1][1] : null;
  const series = (tvlRaw as Protocol | null)?.tvl;
  const lastTvl =
    Array.isArray(series) && series.length > 0
      ? series[series.length - 1].totalLiquidityUSD
      : null;
  return { fees24hUsd: cleanMetric(lastFee), tvlUsd: cleanMetric(lastTvl) };
}
