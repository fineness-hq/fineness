export default function WhyTeraWallet() {
  const values = [
    { num: '01', title: 'Custody Before Automation' },
    { num: '02', title: 'Your Private Rules, Enforced' },
    { num: '03', title: 'Exact Action Approval' },
    { num: '04', title: 'Revoke Access in One Action' },
  ]
  return (
    <section className="relative bg-beige bg-grid py-24">
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute left-[35%] top-0 bottom-0 dashed-line-v" />
        <div className="absolute left-[65%] top-0 bottom-0 dashed-line-v" />
      </div>
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="section-badge mb-6">
          <span className="num">08</span>
          <span>Value</span>
        </div>
        <h2 className="text-[clamp(36px,4vw,52px)] leading-tight font-medium text-dark mb-16">
          Why<br />Tera Wallet
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {values.map((v, i) => (
            <div key={i} className="border-t border-dashed border-beige-dark pt-8 pb-12 pr-6">
              <div className="text-[64px] font-light leading-none text-dark mb-6">
                <span className="text-[28px]">.</span>{v.num}
              </div>
              <h3 className="font-mono text-[12px] uppercase tracking-wider leading-relaxed">{v.title}</h3>
            </div>
          ))}
        </div>
        <h3 className="font-mono text-lg uppercase tracking-wider font-medium mt-8">+ Much More</h3>
        <div className="overflow-hidden py-6 mt-8 border-y border-dashed border-beige-dark/50">
          <div className="animate-marquee gap-8 whitespace-nowrap">
            {[...Array(16)].map((_, i) => (
              <span key={i} className="font-mono text-[11px] uppercase tracking-widest text-gray-dark flex items-center gap-8">
                <span>Tera Wallet · Private by default</span>
                <span className="text-olive">•</span>
              </span>
            ))}
          </div>
        </div>
        <p className="font-mono text-[13px] uppercase tracking-wider leading-relaxed mt-4 max-w-md">
          Permission comes from code, never from an agent’s explanation.
        </p>
      </div>
    </section>
  )
}
