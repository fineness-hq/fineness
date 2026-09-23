export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Prepare\nYour\nIntent' },
    { num: '02', title: 'Verify\nAsset &\nEligibility' },
    { num: '03', title: 'Check\nPrivate\nPolicy\n& Risk' },
    { num: '04', title: 'Review,\nApprove\n& Execute' },
  ]

  return (
    <section id="process" className="relative bg-white bg-grid py-24">
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute left-[35%] top-0 bottom-0 dashed-line-v" />
        <div className="absolute left-[65%] top-0 bottom-0 dashed-line-v" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="section-badge mb-6">
          <span className="num">03</span>
          <span>Process</span>
        </div>
        <h2 className="text-[clamp(36px,4vw,52px)] leading-tight font-medium text-dark mb-16">
          How it works
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12">
          {/* Left description */}
          <p className="font-mono text-[13px] uppercase tracking-wider leading-relaxed">
            Every proposal passes deterministic checks. Your authority stays intact.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <div key={i} className="relative border-l border-dashed border-beige-dark pl-6 pr-4 pb-8">
                <div className="text-[64px] lg:text-[72px] font-light leading-none text-dark mb-8">
                  <span className="text-[32px]">.</span>{step.num}
                </div>
                <h3 className="font-mono text-[12px] uppercase tracking-wider leading-relaxed whitespace-pre-line">
                  {step.title}
                </h3>
                {/* Icon placeholder */}
                <div className="mt-8">
                  {i === 0 && (
                    <div className="w-10 h-12 border border-olive/30 bg-olive/5 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-[2px]">
                        {[...Array(9)].map((_, j) => <div key={j} className="w-1 h-1 bg-olive/50" />)}
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
                      <polyline points="2,20 12,8 20,16 34,4" stroke="#768143" strokeWidth="1.5" />
                      <polyline points="2,24 12,12 20,20 34,8" stroke="#9e9e9e" strokeWidth="1" strokeDasharray="3 2" />
                    </svg>
                  )}
                  {i === 2 && (
                    <div className="w-10 h-12 border border-beige-dark flex items-center justify-center">
                      <div className="w-3 h-3 border border-olive bg-olive/20" />
                    </div>
                  )}
                  {i === 3 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12L10 17L20 7" stroke="#768143" strokeWidth="2" />
                    </svg>
                  )}
                </div>
                {/* Connecting arrow */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-[120px] -right-4 z-10">
                    <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
                      <line x1="0" y1="6" x2="32" y2="6" stroke="#d2ceca" strokeWidth="1" strokeDasharray="4 3" />
                      <path d="M30 2L36 6L30 10" stroke="#d2ceca" strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
