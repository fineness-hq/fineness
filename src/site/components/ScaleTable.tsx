/** Karat scale reference table. Band colors are semantic, never maroon. */
export default function ScaleTable() {
  const rows: [string, string, string][] = [
    ['22k', '916 and above', 'var(--band-high)'],
    ['18k', '750 to 915', 'var(--band-high)'],
    ['14k', '585 to 749', 'var(--band-mid)'],
    ['9k', '375 to 584', 'var(--band-low)'],
    ['Below hallmark', 'Under 375 — listed, not certified', 'var(--band-none)'],
  ];
  return (
    <section aria-labelledby="scale-title" id="scale" className="page-wrap py-10">
      <p className="eyebrow">01 / scale</p>
      <h2
        id="scale-title"
        className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
      >
        The karat scale
      </h2>
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
            {rows.map(([bandName, range, color]) => (
              <tr
                key={bandName}
                className="border-b border-[var(--rule)] transition-colors last:border-0 hover:bg-[var(--surface-2)]"
              >
                <th scope="row" className="px-4 py-2 text-sm font-semibold text-[var(--ink)]">
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: color }}
                  />
                  {bandName}
                </th>
                <td className="mono px-4 py-2 text-sm tabular-nums text-[var(--ink-2)]">{range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
