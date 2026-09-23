import fs from 'node:fs';
import path from 'node:path';
import { KNOWN_EDITION_IDS } from '../../../../src/site/editions';

export function generateStaticParams() {
  return KNOWN_EDITION_IDS.map((edition) => ({ edition }));
}

/** Verbatim edition JSON with an application/json content type. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ edition: string }> },
) {
  const { edition } = await params;
  if (!KNOWN_EDITION_IDS.includes(edition)) {
    return new Response('Not found', { status: 404 });
  }
  const file = path.join(process.cwd(), 'data', 'editions', `${edition}.json`);
  const raw = fs.readFileSync(file, 'utf8');
  return new Response(raw, {
    headers: { 'content-type': 'application/json' },
  });
}
