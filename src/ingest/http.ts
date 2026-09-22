// Shared HTTP helper for ingest providers. Never throws: any failure
// (network, timeout, bad status, unparsable body) resolves to null so a
// gap always renders as "not published" instead of a fabricated figure.

export interface FetchOptions {
  timeoutMs?: number;
  headers?: Record<string, string>;
  method?: string;
  body?: string;
}

const DEFAULT_TIMEOUT_MS = 15000;

/** GET/POST JSON and return the parsed body, or null on any failure. */
export async function fetchJson(
  url: string,
  options: FetchOptions = {},
): Promise<unknown | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: options.method ?? 'GET',
      headers: { accept: 'application/json', ...(options.headers ?? {}) },
      body: options.body,
      signal: controller.signal,
    });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Accept only finite numbers >= 0. Anything else becomes null. */
export function cleanMetric(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? value
    : null;
}
