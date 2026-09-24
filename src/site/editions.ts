import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { computeDeltas } from '../build/deltas';
import type { Delta } from '../build/deltas';
import type { Edition, SourceRegistry } from '../types';
import edition202609 from '../../data/editions/2026-09.json';
import edition202610 from '../../data/editions/2026-10.json';
import sourcesData from '../../data/sources.json';

function loadEditions(): Edition[] {
  try {
    const dir = join(process.cwd(), 'data', 'editions');
    const files = readdirSync(dir)
      .filter((f) => /^\d{4}-\d{2}\.json$/.test(f))
      .sort();
    if (files.length > 0) {
      return files.map(
        (f) => JSON.parse(readFileSync(join(dir, f), 'utf8')) as Edition,
      );
    }
  } catch {
    // Fall through to bundled editions (client-safe path).
  }
  return [
    edition202609 as unknown as Edition,
    edition202610 as unknown as Edition,
  ];
}

export const EDITIONS = loadEditions();

export const LATEST_EDITION = EDITIONS[EDITIONS.length - 1];

export const KNOWN_EDITION_IDS = EDITIONS.map((e) => e.edition);

export const SOURCES = sourcesData as unknown as SourceRegistry;

/** Deltas of an edition against its predecessor. First edition has none. */
export function deltasFor(edition: Edition): Record<string, Delta> {
  const index = EDITIONS.findIndex((e) => e.edition === edition.edition);
  if (index <= 0) return {};
  const prev = EDITIONS[index - 1];
  return computeDeltas(edition.venues, prev.venues, prev.edition);
}
