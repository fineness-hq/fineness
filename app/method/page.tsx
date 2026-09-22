import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '../../src/site/components/Footer';
import Masthead from '../../src/site/components/Masthead';
import { LATEST_EDITION } from '../../src/site/editions';

export const metadata: Metadata = {
  title: 'Fineness — Method',
  description:
    'Standing methodology and admission standard of the Fineness register. Scoring weights, karat bands, admission rules, and integrity constraints.',
};

const WEIGHTS: [string, string][] = [
  ['Asset quality and verifiability', '30%'],
  ['Traction: volume, share, fee revenue, pool depth', '25%'],
  ['Transparency: contracts, locks, docs, named entity', '20%'],
  ['Compliance: regulatory standing, disclosure', '15%'],
  ['Durability: age, shock resilience, dependencies', '10%'],
];

const BANDS: [string, string][] = [
  ['22k', '916 and above'],
  ['18k', '750 to 915'],
  ['14k', '585 to 749'],
  ['9k', '375 to 584'],
  ['Below hallmark', 'Under 375 — listed, not certified'],
];

/** Standing methodology and admission standard. Mirrors docs/METHOD.md. */
export default function MethodPage() {
  return (
    <main>
      <Masthead edition={LATEST_EDITION.edition} />
      <div className="mx-auto max-w-5xl px-4 pb-4 pt-12">
        <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">
          Standing document
        </p>
        <h1 className="mt-4 font-[var(--font-inter)] text-4xl font-extrabold tracking-tight text-[var(--ink)]">
          Method
        </h1>
        <p className="prose mt-6 max-w-[66ch] text-lg leading-relaxed text-[var(--ink-2)]">
          The methodology is the product. Every score must be reproducible by a
          reader from published inputs. Scores are editorial judgements on
          public information. Fineness is never an audit, a credit rating, or
          investment advice.
        </p>
      </div>

      <section aria-labelledby="scoring-title" className="mx-auto max-w-5xl px-4 py-10">
        <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">01 / scoring</p>
        <h2
          id="scoring-title"
          className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
        >
          Scoring engine
        </h2>
        <p className="prose mt-3 max-w-[66ch] text-base leading-relaxed text-[var(--ink-2)]">
          Each venue is scored 0 to 10 on five criteria. The weighted mean is
          multiplied by 100 and rounded once at the end to a fineness value
          from 0 to 1000. Weights must sum to 1 or scoring throws. Ties break
          alphabetically by venue name so ordering is stable across rebuilds.
        </p>
        <div className="mt-4 overflow-x-auto border border-[var(--rule)] bg-[var(--surface)]">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--rule)]">
                <th scope="col" className="mono px-4 py-2 text-xs uppercase tracking-widest text-[var(--ink-3)]">
                  Criterion
                </th>
                <th scope="col" className="mono px-4 py-2 text-xs uppercase tracking-widest text-[var(--ink-3)]">
                  House weight
                </th>
              </tr>
            </thead>
            <tbody>
              {WEIGHTS.map(([criterion, weight]) => (
                <tr key={criterion} className="border-b border-[var(--rule)] last:border-0">
                  <th scope="row" className="px-4 py-2 text-sm font-semibold text-[var(--ink)]">
                    {criterion}
                  </th>
                  <td className="mono px-4 py-2 text-sm tabular-nums text-[var(--ink-2)]">{weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 overflow-x-auto border border-[var(--rule)] bg-[var(--surface)]">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--rule)]">
                <th scope="col" className="mono px-4 py-2 text-xs uppercase tracking-widest text-[var(--ink-3)]">
                  Band
                </th>
                <th scope="col" className="mono px-4 py-2 text-xs uppercase tracking-widest text-[var(--ink-3)]">
                  Fineness
                </th>
              </tr>
            </thead>
            <tbody>
              {BANDS.map(([bandName, range]) => (
                <tr key={bandName} className="border-b border-[var(--rule)] last:border-0">
                  <th scope="row" className="px-4 py-2 text-sm font-semibold text-[var(--ink)]">
                    {bandName}
                  </th>
                  <td className="mono px-4 py-2 text-sm tabular-nums text-[var(--ink-2)]">{range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="prose mt-3 max-w-[66ch] text-base leading-relaxed text-[var(--ink-2)]">
          The hallmark is 375. Venues below it are listed but not certified.
          Zero sum reader weights fall back to equal weighting instead of
          dividing by zero. Reader reweighting changes the ranking but never
          the published deltas, which are computed at house weights only.
        </p>
      </section>

      <section aria-labelledby="admission-title" className="mx-auto max-w-5xl px-4 py-10">
        <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">02 / admission</p>
        <h2
          id="admission-title"
          className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
        >
          Admission standard
        </h2>
        <p className="prose mt-3 max-w-[66ch] text-base leading-relaxed text-[var(--ink-2)]">
          From Edition 02 a venue is admitted when all four conditions hold at
          the cut date:
        </p>
        <ol className="prose mt-3 max-w-[66ch] list-decimal pl-6 text-base leading-relaxed text-[var(--ink-2)]">
          <li>A deployed contract on a public chain, verified on that chain explorer.</li>
          <li>
            A pairing asset that claims real world backing, or a launch mechanic
            that routes value to a real world asset.
          </li>
          <li>At least one completed public launch or live market.</li>
          <li>A reachable public interface or documentation under a domain the operator controls.</li>
        </ol>
        <p className="prose mt-3 max-w-[66ch] text-base leading-relaxed text-[var(--ink-2)]">
          A venue is struck after 60 days without a launch, a dark public
          interface, or loss of domain and key control. A venue that fails the
          pairing condition on re-review is struck rather than scored low,
          because it was never in the category.
        </p>
      </section>

      <section aria-labelledby="integrity-title" className="mx-auto max-w-5xl px-4 py-10">
        <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">03 / integrity</p>
        <h2
          id="integrity-title"
          className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
        >
          Integrity
        </h2>
        <ul className="prose mt-3 max-w-[66ch] list-disc pl-6 text-base leading-relaxed text-[var(--ink-2)]">
          <li>No venue pays for inclusion, placement, or removal. No such code path exists.</li>
          <li>Affiliate and referral links are prohibited anywhere in an edition.</li>
          <li>Every figure carries a sourceId resolving to the edition source list.</li>
          <li>A missing metric is null and renders as not published, never as zero.</li>
          <li>Published editions are immutable. Corrections ship as dated notes with the original figure kept visible.</li>
        </ul>
        <p className="mono mt-6 text-xs text-[var(--ink-2)]">
            <Link href={`/editions/${LATEST_EDITION.edition}`} className="underline-offset-4 hover:underline">
              Edition {LATEST_EDITION.edition}
            </Link>
            {' · '}
            <Link href={`/editions/${LATEST_EDITION.edition}.json`} className="underline-offset-4 hover:underline">
            Edition JSON
          </Link>
        </p>
      </section>
      <Footer edition={LATEST_EDITION.edition} />
    </main>
  );
}
