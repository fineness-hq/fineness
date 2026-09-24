import Link from 'next/link';
import MenuButton from './MenuButton';
import { XSlide } from './Stagger';
import FinenessMark from './FinenessMark';

interface MastheadProps {
  edition: string;
  latestEdition?: string;
}

/** Fixed header: brand left, language + register + menu boxes right. */
export default function Masthead({ edition, latestEdition }: MastheadProps) {
  return (
    <>
      <header className="tera-header">
        <div className="page-wrap tera-header-in">
          <Link href="/" className="tera-brand" aria-label="Fineness home">
            <XSlide className="tera-brand-slide">
              <FinenessMark size={22} color="var(--gold)" />
              <span className="tera-brand-word">FINENESS</span>
              <span className="tera-brand-ed">{edition}</span>
            </XSlide>
          </Link>
          <nav aria-label="Primary" className="tera-header-right">
            <Link href="/#register" className="tera-open">
              OPEN REGISTER&nbsp;&nbsp;↗
            </Link>
            <MenuButton latestEdition={latestEdition ?? edition} />
          </nav>
        </div>
      </header>
      <div aria-hidden="true" className="tera-header-spacer" />
    </>
  );
}
