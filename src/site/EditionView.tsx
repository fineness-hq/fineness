import type { Criterion, Weights } from '../scoring/fineness';
import type { Delta } from '../build/deltas';
import type { Edition, SourceRegistry } from '../types';
import AlertStrip from './components/AlertStrip';
import ComparisonTable from './components/ComparisonTable';
import Corrections from './components/Corrections';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Limits from './components/Limits';
import Masthead from './components/Masthead';
import NextEdition from './components/NextEdition';
import RegisterClient from './components/RegisterClient';
import RegulatedTable from './components/RegulatedTable';
import ScaleTable from './components/ScaleTable';
import Sources from './components/Sources';
import StatRow from './components/StatRow';
import StruckList from './components/StruckList';
import LogoRow from './components/LogoRow';
import CrucibleManifesto from './components/CrucibleManifesto';
import ScoringWorkflow from './components/ScoringWorkflow';
import WhyFinenessBento from './components/WhyFinenessBento';
import FinenessFAQ from './components/FinenessFAQ';
import ProtocolCTA from './components/ProtocolCTA';
import FloatingMascot from './components/FloatingMascot';

interface EditionViewProps {
  edition: Edition;
  sources: SourceRegistry;
  initialWeights: Weights;
  initialRaw: Record<Criterion, number>;
  deltas?: Record<string, Delta>;
  latestEdition?: string;
}

/** Full edition page. Server rendered so content reads without JavaScript. */
export default function EditionView({
  edition,
  sources,
  initialWeights,
  initialRaw,
  deltas = {},
  latestEdition,
}: EditionViewProps) {
  const peak = Math.max(...edition.venues.map((v) => v.fineness));
  const alert =
    peak >= 750
      ? `Edition peak fineness ${peak}. A venue cleared 18 karat.`
      : undefined;
  return (
    <>
      <Masthead edition={edition.edition} latestEdition={latestEdition ?? edition.edition} />
      <AlertStrip message={alert} />
      <Hero
        edition={edition.edition}
        dataAsOf={edition.dataAsOf}
        snapshotHash={edition.snapshotHash}
        peak={peak}
        venues={edition.venues}
      />
      <StatRow venues={edition.venues} dataAsOf={edition.dataAsOf} />
      <LogoRow items={edition.venues.map((v) => ({ name: v.name, fineness: v.fineness }))} />

      {/* Educational & Narrative Sections ("What is Fineness & The Crucible?") */}
      <CrucibleManifesto />
      <ScoringWorkflow />
      <WhyFinenessBento />

      <ScaleTable />
      <RegisterClient
        venues={edition.venues}
        deltas={deltas}
        initialWeights={initialWeights}
        initialRaw={initialRaw}
      />
      <ComparisonTable venues={edition.venues} />
      <RegulatedTable venues={edition.venues} />
      <StruckList venues={edition.venues} />
      <Limits />

      {/* Primer FAQ & Open Protocol Developer CTA */}
      <FinenessFAQ />
      <ProtocolCTA edition={edition.edition} />

      <NextEdition currentEdition={edition.edition} />
      <Corrections corrections={edition.corrections} />
      <Sources sources={sources} disclosures={edition.disclosures} />
      <Footer edition={edition.edition} />
      <FloatingMascot />
    </>
  );
}
