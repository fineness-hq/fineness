import Link from 'next/link';
import { Github } from 'lucide-react';
import MenuButton from './MenuButton';
import XIcon from './XIcon';
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
              <FinenessMark size={46} className="-mr-3.5" />
              <span className="tera-brand-word">FINENESS</span>
              <span className="tera-brand-ed">{edition}</span>
            </XSlide>
          </Link>
          <nav aria-label="Primary" className="tera-header-right">
            <Link href="/#register" className="tera-open">
              OPEN REGISTER&nbsp;&nbsp;↗
            </Link>
            <a
              href="https://github.com/fineness-hq/fineness"
              target="_blank"
              rel="noopener noreferrer"
              className="tera-gh"
              aria-label="Fineness GitHub repository"
              title="GitHub"
            >
              <Github size={16} aria-hidden="true" />
            </a>
            <a
              href="https://x.com/finenesslabs"
              target="_blank"
              rel="noopener noreferrer"
              className="tera-gh"
              aria-label="Fineness on X"
              title="X"
            >
              <XIcon size={14} />
            </a>
            <MenuButton latestEdition={latestEdition ?? edition} />
          </nav>
        </div>
      </header>
      <div aria-hidden="true" id="top" className="tera-header-spacer" />
    </>
  );
}
