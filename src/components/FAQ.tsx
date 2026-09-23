import { useState } from 'react'

const faqs = [
  { q: 'Can an agent move my assets on its own?', a: 'No. Every asset movement requires your explicit approval. The agent can propose actions, but only you can authorize execution through the wallet.' },
  { q: 'Does the agent see my private limits?', a: 'No. The agent receives only a pass or fail result. Your balances, spending thresholds, and strategy remain private.' },
  { q: 'How are issuer restrictions checked?', a: 'Asset eligibility is verified against on-chain issuer registries before any action proceeds. Non-compliant actions are rejected automatically.' },
  { q: 'What happens when a check fails?', a: 'The action is blocked and you receive a clear explanation of which gate rejected it. No partial execution occurs.' },
  { q: 'Is this wallet already live?', a: 'Tera Wallet is currently in development. Follow the roadmap for updates on our phased launch.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="relative dark-texture py-24">
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute left-[35%] top-0 bottom-0 border-l border-dashed border-white/10" />
        <div className="absolute left-[65%] top-0 bottom-0 border-l border-dashed border-white/10" />
      </div>
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="section-badge mb-6 text-white/60">
          <span className="num">11</span>
          <span>Help</span>
        </div>
        <h2 className="text-[clamp(36px,4vw,52px)] leading-tight font-medium text-white mb-16">FAQ</h2>
        <div className="space-y-0 max-w-3xl">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left">
                <span className="font-mono text-[13px] uppercase tracking-wider text-white/80">{faq.q}</span>
                <span className="text-white/50 text-xl ml-4">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="pb-6 pr-12">
                  <p className="text-sm leading-relaxed text-white/60">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="overflow-hidden py-6 mt-12 border-y border-dashed border-white/10">
          <div className="animate-marquee gap-8 whitespace-nowrap">
            {[...Array(16)].map((_, i) => (
              <span key={i} className="font-mono text-[11px] uppercase tracking-widest text-white/40 flex items-center gap-8">
                <span>Tera Wallet · Private by default</span>
                <span className="text-olive">•</span>
              </span>
            ))}
          </div>
        </div>
        <p className="font-mono text-[13px] uppercase tracking-wider leading-relaxed text-white/60 mt-8 max-w-md">
          Understand your custody, rules and approval authority.
        </p>
        <div className="mt-8 flex items-center gap-4 flex-wrap">
          <span className="font-mono text-[13px] uppercase tracking-wider text-white/40">Got some other questions?</span>
          <a href="https://www.terawallet.app/contacts#home" className="bg-olive text-white font-mono text-[12px] uppercase tracking-[0.2em] py-3 px-6 hover:bg-olive/90 transition-colors">Coming Soon</a>
        </div>
      </div>
    </section>
  )
}
