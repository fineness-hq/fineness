import type { Metadata } from 'next';
import EditionView from '../src/site/EditionView';
import { deltasFor, LATEST_EDITION, SOURCES } from '../src/site/editions';
import { parseRawSliders, parseWeights } from '../src/site/weight-url';

export const metadata: Metadata = {
  title: `Fineness : Edition ${LATEST_EDITION.edition}`,
  description:
    'Monthly ranked register scoring tokenized asset venues on a 0–1000 fineness scale. Editorial judgement on public information, not audits or ratings.',
};

type SearchParams = Record<string, string | string[] | undefined>;

interface HomeProps {
  searchParams?: Promise<SearchParams>;
}

/** Latest edition, canonical. Parses reweight query on the server. */
export default async function Home({ searchParams }: HomeProps) {
  const resolved = (await searchParams) ?? {};
  const rawParam = Array.isArray(resolved.w) ? resolved.w[0] : resolved.w;
  const query = typeof rawParam === 'string' && rawParam !== '' ? `?w=${rawParam}` : '';
  const initialWeights = parseWeights(query);
  const initialRaw = parseRawSliders(query);
  return (
    <main>
      <EditionView
        edition={LATEST_EDITION}
        sources={SOURCES}
        initialWeights={initialWeights}
        initialRaw={initialRaw}
        deltas={deltasFor(LATEST_EDITION)}
        latestEdition={LATEST_EDITION.edition}
      />
    </main>
  );
}
