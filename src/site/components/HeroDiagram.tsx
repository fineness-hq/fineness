/** Filing card with folded corner and olive glyph. Decorative miniature. */
function FileCard({ label, glyph }: { label: string; glyph: string }) {
  return (
    <span className="tera-file" aria-hidden="true">
      <span className="tera-file-glyph">{glyph}</span>
      <span className="tera-file-label">{label}</span>
    </span>
  );
}

/**
 * Approval diagram: hatched olive frame with corner brackets, white core
 * showing the edition peak, dotted connector arrows, satellite file cards.
 */
export default function HeroDiagram({ peak, band }: { peak: number; band: string }) {
  return (
    <div className="tera-diagram" role="img" aria-label={`Edition peak fineness ${peak}, band ${band}`}>
      <div className="tera-diagram-top">
        <FileCard label="ID" glyph="◈" />
      </div>
      <div className="tera-diagram-mid">
        <svg className="tera-diagram-rail" viewBox="0 0 120 120" aria-hidden="true">
          <path d="M0 35 H104 M0 60 H104 M0 85 H104" className="tera-dots" />
          <path d="M104 35 l10 5 l-10 5 M104 60 l10 5 l-10 5 M104 85 l10 5 l-10 5" className="tera-dots-head" />
        </svg>
        <div className="tera-frame">
          <span className="tera-corner tera-corner-tl" aria-hidden="true" />
          <span className="tera-corner tera-corner-tr" aria-hidden="true" />
          <span className="tera-corner tera-corner-bl" aria-hidden="true" />
          <span className="tera-corner tera-corner-br" aria-hidden="true" />
          <span className="tera-frame-core">
            <span className="tera-frame-peak">{peak}</span>
            <span className="tera-frame-band">{band}</span>
          </span>
        </div>
        <svg className="tera-diagram-out" viewBox="0 0 90 40" aria-hidden="true">
          <path d="M0 20 H74" className="tera-dots" />
          <path d="M74 14 l12 6 l-12 6" className="tera-dots-head" />
        </svg>
        <FileCard label="≡" glyph="▤" />
      </div>
      <div className="tera-diagram-vert" aria-hidden="true">
        <svg viewBox="0 0 20 64" className="tera-vert-svg">
          <path d="M10 0 V48" className="tera-dots" />
          <path d="M5 48 l5 10 l5 -10" className="tera-dots-head" />
        </svg>
      </div>
      <div className="tera-diagram-bottom">
        <FileCard label="▬" glyph="▦" />
        <svg viewBox="0 0 20 64" className="tera-vert-svg tera-vert-flip" aria-hidden="true">
          <path d="M10 16 V64" className="tera-dots" />
          <path d="M5 16 l5 -10 l5 10" className="tera-dots-head" />
        </svg>
      </div>
    </div>
  );
}
