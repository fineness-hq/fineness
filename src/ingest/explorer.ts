// Chain explorer contract verification. Null means unknown: the caller
// must retain the previous value rather than clobber it with false.

import { fetchJson } from './http';

function apiBase(): string {
  const env = process.env['EXPLORER_API_URL'];
  return (typeof env === 'string' && env.length > 0 ? env : 'https://robinhoodchain.blockscout.com/api').replace(
    /\/$/,
    '',
  );
}

interface SourceResponse {
  result?: { ABI?: string }[] | string;
}

const NOT_VERIFIED = 'Contract source code not verified';

/** Fetch verification status for one address. Null when the check fails. */
export async function fetchContractVerification(
  address: string,
): Promise<boolean | null> {
  const raw = (await fetchJson(
    `${apiBase()}?module=contract&action=getsourcecode&address=${encodeURIComponent(address)}`,
  )) as SourceResponse | null;
  const result = raw?.result;
  if (Array.isArray(result) && result.length > 0 && typeof result[0].ABI === 'string') {
    return result[0].ABI !== NOT_VERIFIED;
  }
  return null;
}
