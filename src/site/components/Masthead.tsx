import Link from 'next/link';
import MenuButton from './MenuButton';
import { XSlide } from './Stagger';

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
              <span className="tera-mark" aria-hidden="true">
                <span className="tera-mark-a" />
                <span className="tera-mark-b" />
                <span className="tera-mark-c" />
              </span>
              <span className="tera-brand-word">FINENESS</span>
              <span className="tera-brand-ed">{edition}</span>
            </XSlide>
          </Link>
          <nav aria-label="Primary" className="tera-header-right">
            <span className="tera-lang" title="English only">
              LANGUAGE&nbsp;&nbsp;EN&nbsp;&nbsp;▾
            </span>
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
