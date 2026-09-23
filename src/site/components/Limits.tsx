/** Standing limits of the methodology. Static editorial copy. */
import Reveal from './Reveal';

export default function Limits() {
  const items = [
    'Scores are judgements on public information at the cut date, not measurements.',
    'A missing metric renders as not published, never as zero.',
    'Four of ten venues publish no verifiable volume. That is the normal case.',
    'Pairing assets carry the thesis: the real asset often appears only as the pairing.',
  ];
  return (
    <section aria-labelledby="limits-title" id="limits" className="page-wrap py-10">
      <Reveal>
      <p className="eyebrow">06 / limits</p>
      <h2
        id="limits-title"
        className="mt-2 font-[var(--font-inter)] text-2xl font-bold tracking-tight text-[var(--ink)]"
      >
        Limits
      </h2>
      <ul className="prose mt-4 max-w-[66ch] list-disc pl-6 text-base leading-relaxed text-[var(--ink-2)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      </Reveal>
    </section>
  );
}
