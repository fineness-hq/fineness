interface LogoRowProps {
  items: { name: string; fineness: number }[];
}

/** Static logo row. No marquee. Same props as the old ticker so routes keep working. */
export default function LogoRow({ items }: LogoRowProps) {
  const top = items.slice(0, 5);
  return (
    <div aria-label="Top venues" className="border-b border-[var(--rule)] bg-[var(--surface)]">
      <div className="page-wrap flex flex-wrap items-center gap-x-10 gap-y-3 py-4">
        {top.map((v) => (
          <span
            key={v.name}
            className="mono text-xs uppercase tracking-widest text-[var(--ink-2)]"
          >
            {v.name}
            <span className="ml-2 tabular-nums text-[var(--ink-3)]">{v.fineness}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
