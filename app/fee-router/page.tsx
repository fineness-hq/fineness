import type { Metadata } from 'next';
import Masthead from '../../src/site/components/Masthead';
import Footer from '../../src/site/components/Footer';
import FeeRouterClient from '../../src/site/components/FeeRouterClient';
import { LATEST_EDITION } from '../../src/site/editions';

export const metadata: Metadata = {
  title: 'Fineness : Fee Router',
  description:
    'Every $FINE creator fee lands in a contract nobody controls. 50% burned at every monthly freeze, 30% to the Verification Vault, 20% to data.',
  openGraph: {
    title: 'Fineness Fee Router · Hash and burn',
    description:
      'No owner. No withdraw. No keeper. Every $FINE fee leaves three ways: burned, paid to whoever proves the register wrong, or spent on data.',
    url: 'https://fineness.tech/fee-router',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fineness Fee Router · Hash and burn',
    description:
      '50% burned at monthly freeze, 30% to Verification Vault, 20% to data. No owner, no withdraw, no keeper.',
  },
};

/**
 * FeeRouterPage:
 * Dedicated server route for /fee-router, rendering shared Masthead,
 * interactive FeeRouterClient island, and shared Footer.
 */
export default function FeeRouterPage() {
  return (
    <main>
      <Masthead edition={LATEST_EDITION.edition} latestEdition={LATEST_EDITION.edition} />
      <FeeRouterClient editionId={LATEST_EDITION.edition} editionHash={LATEST_EDITION.snapshotHash} />
      <Footer edition={LATEST_EDITION.edition} />
    </main>
  );
}
