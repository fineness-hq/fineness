import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EditionView from '../../../src/site/EditionView';
import { deltasFor, KNOWN_EDITION_IDS, EDITIONS, LATEST_EDITION, SOURCES } from '../../../src/site/editions';
import { parseRawSliders, parseWeights } from '../../../src/site/weight-url';

export function generateStaticParams() {
  return KNOWN_EDITION_IDS.map((edition) => ({ edition }));
}

export const dynamicParams = false;

type SearchParams = Record<string, string | string[] | undefined>;

interface EditionPageProps {
  params: Promise<{ edition: string }>;
  searchParams?: Promise<SearchParams>;
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }): Promise<Metadata> {
  const { edition } = await params;
  return {
    title: `Fineness — Edition ${edition}`,
    description: `Permanent record of the Fineness register for edition ${edition}. Scores are editorial judgements on public information.`,
  };
}

/** Permanent edition page. Unknown editions return 404. */
export default async function EditionPage({ params, searchParams }: EditionPageProps) {
  const { edition: id } = await params;
  const edition = EDITIONS.find((e) => e.edition === id);
  if (!edition) notFound();
  const resolved = (await searchParams) ?? {};
  const rawParam = Array.isArray(resolved.w) ? resolved.w[0] : resolved.w;
  const query = typeof rawParam === 'string' && rawParam !== '' ? `?w=${rawParam}` : '';
  const initialWeights = parseWeights(query);
  const initialRaw = parseRawSliders(query);
  return (
    <main>
      <EditionView
        edition={edition}
        sources={SOURCES}
        initialWeights={initialWeights}
        initialRaw={initialRaw}
        deltas={deltasFor(edition)}
        latestEdition={LATEST_EDITION.edition}
      />
    </main>
  );
}
