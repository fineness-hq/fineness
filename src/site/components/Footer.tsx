import Link from 'next/link';

interface FooterProps {
  edition: string;
}

/** Footer: line-grid with Info part (Menu + Service menu) + Form part + Logo block. */
export default function Footer({ edition }: FooterProps) {
  const menu = [
    ['Register', '#register'],
    ['Scale', '#scale'],
    ['Comparison', '#comparison'],
    ['Sources', '#sources'],
  ];
  const service = [
    ['Method', '/method'],
    ['Edition JSON', `/editions/${edition}/edition.json`],
    ['Venues', '/venues/long-xyz'],
    ['Latest', '/'],
  ];
  const logos = ['Long.xyz', 'Pons', 'Ledger', 'Mint', 'Vault'];
  return (
    <footer className="line-grid border-t border-[var(--rule)] bg-[var(--surface)]">
      <div className="page-wrap grid gap-10 py-12 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="eyebrow">09 / Contact</p>
          <p className="mt-3 font-[var(--font-inter)] text-[42px] font-bold leading-none tracking-tight text-[var(--ink)]">
            Fineness
          </p>
          <p className="prose mt-3 max-w-[52ch] text-sm leading-relaxed text-[var(--ink-2)]">
            Scores are editorial judgements on public information. Fineness is
            not an audit, a credit rating, or investment advice.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8">
            <nav aria-label="Footer menu">
              <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">
                Menu
              </p>
              <ul className="service-list mt-3 space-y-2">
                {menu.map(([label, href]) => (
                  <li key={href + label}>
                    <Link
                      href={href}
                      className="site-link mono text-xs uppercase tracking-widest text-[var(--ink-2)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Footer service">
              <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">
                Service
              </p>
              <ul className="service-list mt-3 space-y-2">
                {service.map(([label, href]) => (
                  <li key={href + label}>
                    <Link
                      href={href}
                      className="site-link mono text-xs uppercase tracking-widest text-[var(--ink-2)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="line-grid-vert pl-0 md:pl-10">
          <p className="mono text-xs uppercase tracking-widest text-[var(--ink-3)]">
            Get the next edition
          </p>
          <form
            action="/"
            method="get"
            className="mt-4 space-y-3"
            aria-label="Edition notification form"
          >
            <div>
              <label
                htmlFor="footer-name"
                className="mono text-xs uppercase tracking-widest text-[var(--ink-2)]"
              >
                Name
              </label>
              <input
                id="footer-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="NAME"
                className="mono mt-1 w-full border border-[var(--rule)] bg-[var(--ground)] px-3 py-3 text-xs uppercase tracking-widest text-[var(--ink)] placeholder:text-[var(--ink-3)]"
              />
            </div>
            <div>
              <label
                htmlFor="footer-email"
                className="mono text-xs uppercase tracking-widest text-[var(--ink-2)]"
              >
                Email
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="EMAIL"
                className="mono mt-1 w-full border border-[var(--rule)] bg-[var(--ground)] px-3 py-3 text-xs uppercase tracking-widest text-[var(--ink)] placeholder:text-[var(--ink-3)]"
              />
            </div>
            <button
              type="submit"
              className="mono min-h-[44px] bg-[var(--ink)] px-5 text-xs font-bold uppercase tracking-widest text-white"
            >
              Start
            </button>
          </form>
          <div className="line-grid-hor mt-8 pt-6" aria-label="Venue logos">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {logos.map((logo) => (
                <span
                  key={logo}
                  className="mono text-xs font-bold uppercase tracking-widest text-[var(--ink-3)]"
                >
                  {logo}
                </span>
              ))}
            </div>
            <p className="mono mt-4 text-xs tabular-nums text-[var(--ink-3)]">
              Edition {edition}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
