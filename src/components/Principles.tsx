import { useState } from 'react'

const principles = [
  {
    title: 'Your keys stay yours',
    subtitle: '01 / self-custody',
    description: 'The agent never holds your keys. It prepares typed proposals; the wallet validates permissions and you retain final authority.',
    image: 'https://www.terawallet.app/tera/art/04-about-impossible-architecture.jpg',
  },
  {
    title: 'Your limits stay private',
    subtitle: '02 / private policy',
    description: 'Your agent sees a pass or fail result, not your balances, strategy or private spending thresholds.',
    image: 'https://www.terawallet.app/tera/art/10-square-cloud-towers.jpg',
  },
]

export default function Principles() {
  const [current, setCurrent] = useState(0)
  return (
    <section className="relative bg-beige bg-grid py-24">
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute left-[35%] top-0 bottom-0 dashed-line-v" />
        <div className="absolute left-[65%] top-0 bottom-0 dashed-line-v" />
      </div>
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="section-badge mb-6">
          <span className="num">09</span>
          <span>Principles</span>
        </div>
        <h2 className="text-[clamp(36px,4vw,52px)] leading-tight font-medium text-dark mb-16">
          Private by default
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-8 items-start">
          <div>
            <h3 className="text-[clamp(28px,3vw,42px)] font-medium text-dark leading-tight mb-4">
              {principles[current].title}
            </h3>
            <p className="font-mono text-[12px] text-gray-dark">{principles[current].subtitle}</p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden grayscale">
              <img src={principles[current].image} alt={principles[current].title} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-sm leading-relaxed text-gray-dark">{principles[current].description}</p>
            <div className="flex gap-2">
              <button onClick={() => setCurrent(Math.max(0, current - 1))} className="w-12 h-12 border border-beige-dark flex items-center justify-center hover:border-dark transition-colors">←</button>
              <button onClick={() => setCurrent(Math.min(principles.length - 1, current + 1))} className="w-12 h-12 bg-dark-deep text-white flex items-center justify-center hover:bg-dark transition-colors">→</button>
            </div>
          </div>
        </div>
        <div className="mt-16 flex items-end gap-4">
          <span className="text-[72px] font-light leading-none">0</span>
          <div>
            <span className="text-sm text-gray-dark">gates</span>
            <p className="font-mono text-[12px] uppercase tracking-wider mt-1">Independent checks before authorization</p>
          </div>
        </div>
      </div>
    </section>
  )
}
