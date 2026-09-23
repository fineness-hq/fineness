export default function Features() {
  const features = [
    { title: 'Asset Checks\n& Eligibility', icon: 'check' },
    { title: 'Private Rules\n& Limits', icon: 'grid' },
    { title: 'Scoped Agent &\nOwner Approval', icon: 'doc' },
    { title: 'Receipts &\nSelective Disclosure', icon: 'chart' },
  ]

  const renderIcon = (type: string) => {
    switch (type) {
      case 'check':
        return (
          <div className="w-12 h-12 bg-olive/10 border border-olive/30 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10L9 14L15 6" stroke="#768143" strokeWidth="2" /></svg>
          </div>
        )
      case 'grid':
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`w-2 h-2 ${i === 2 || i === 5 ? 'bg-olive' : 'bg-beige-dark'}`} />
              ))}
            </div>
          </div>
        )
      case 'doc':
        return (
          <div className="flex items-center gap-1">
            <div className="w-10 h-12 bg-gray-light/30 border border-beige-dark flex flex-col items-center justify-center gap-0.5">
              <div className="w-2 h-2 bg-olive" />
              <div className="flex gap-0.5"><div className="w-4 h-[1.5px] bg-gray-dark" /></div>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M7 3L10 6L7 9" stroke="#9e9e9e" strokeWidth="1" /></svg>
          </div>
        )
      case 'chart':
        return (
          <div className="w-12 h-12 border border-beige-dark flex items-center justify-center">
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
              <polyline points="2,16 8,8 14,12 22,4" stroke="#768143" strokeWidth="1.5" fill="none" />
              <polyline points="2,16 8,8 14,12 22,4" stroke="#768143" strokeWidth="1.5" fill="none" strokeDasharray="2 2" transform="translate(0, 4)" />
            </svg>
          </div>
        )
      default: return null
    }
  }

  return (
    <section className="relative bg-white bg-grid">
      {/* Decorative lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute left-[35%] top-0 bottom-0 dashed-line-v" />
        <div className="absolute left-[65%] top-0 bottom-0 dashed-line-v" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-12 py-24">
        {/* Badge + Heading */}
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-16">
          <div>
            <div className="section-badge mb-6">
              <span className="num">02</span>
              <span>Areas</span>
            </div>
            <h2 className="text-[clamp(36px,4vw,52px)] leading-tight font-medium text-dark">
              What your<br />wallet protects
            </h2>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {features.map((feature, i) => (
            <div
              key={i}
              className="border border-dashed border-beige-dark p-8 lg:p-12 flex flex-col gap-6"
            >
              {renderIcon(feature.icon)}
              <div className="h-24" />
              <h3 className="font-mono text-sm uppercase tracking-wider leading-relaxed whitespace-pre-line">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Ticker */}
        <div className="overflow-hidden py-6 mt-12 border-y border-dashed border-beige-dark/50">
          <div className="animate-marquee gap-8 whitespace-nowrap">
            {[...Array(16)].map((_, i) => (
              <span key={i} className="font-mono text-[11px] uppercase tracking-widest text-gray-dark flex items-center gap-8">
                <span>Tera Wallet · Private by default</span>
                <span className="text-olive">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-8 space-y-8">
          <p className="font-mono text-[13px] uppercase tracking-wider leading-relaxed max-w-md">
            The agent can think. Your wallet enforces.
          </p>
          <h3 className="font-mono text-lg uppercase tracking-wider font-medium">+ Much More</h3>
          <a
            href="https://www.terawallet.app/solutions#home"
            className="inline-block bg-olive text-white font-mono text-[12px] uppercase tracking-[0.2em] py-4 px-8 hover:bg-olive/90 transition-colors"
          >
            Explore All Capabilities
          </a>
        </div>
      </div>
    </section>
  )
}
