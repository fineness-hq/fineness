import { useState } from 'react'

const projects = [
  {
    title: 'Private authorization',
    description: 'Check an action against private rules without revealing your balance, strategy or spending thresholds to the agent.',
    image: 'https://www.terawallet.app/tera/art/01-case-collage.jpg',
  },
  {
    title: 'Owner-approved actions',
    description: 'Bind your approval to the exact asset, amount, route and expiry. Each approval authorizes one specific action.',
    image: 'https://www.terawallet.app/tera/art/01-case-collage.jpg',
  },
  {
    title: 'Private authorization',
    description: 'Give a low-risk task narrowly scoped authority, a hard expiry and a simple way to revoke it. Planned after an audited core.',
    image: 'https://www.terawallet.app/tera/art/01-case-collage.jpg',
  },
]

export default function Projects() {
  const [current, setCurrent] = useState(0)

  return (
    <section id="projects" className="relative dark-texture py-24">
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute left-[35%] top-0 bottom-0 border-l border-dashed border-white/10" />
        <div className="absolute left-[65%] top-0 bottom-0 border-l border-dashed border-white/10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="section-badge mb-6 text-white/60">
          <span className="num">05</span>
          <span>Projects</span>
        </div>
        <h2 className="text-[clamp(36px,4vw,52px)] leading-tight font-medium text-white mb-16">
          Wallet workflows
        </h2>

        {/* Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
          <div className="space-y-6">
            <h3 className="text-[clamp(28px,3vw,42px)] font-medium text-white leading-tight">
              {projects[current].title}
            </h3>
            <p className="font-mono text-[13px] uppercase tracking-wider text-gray-light leading-relaxed max-w-md">
              {projects[current].description}
            </p>
          </div>

          <div className="relative">
            {/* Navigation */}
            <div className="flex gap-2 absolute -top-12 right-0">
              <button
                onClick={() => setCurrent(Math.max(0, current - 1))}
                aria-label="Previous project"
                className="w-12 h-12 border border-white/30 text-white/60 flex items-center justify-center hover:border-white hover:text-white transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setCurrent(Math.min(projects.length - 1, current + 1))}
                aria-label="Next project"
                className="w-12 h-12 bg-dark-deep border border-white/30 text-white flex items-center justify-center hover:border-white transition-colors"
              >
                →
              </button>
            </div>

            {/* Image */}
            <div className="aspect-video bg-gray-light/10 overflow-hidden grayscale">
              <img
                src={projects[current].image}
                alt={projects[current].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href="https://www.terawallet.app/projects#home"
          className="mt-12 block bg-olive text-white font-mono text-[12px] uppercase tracking-[0.2em] py-5 text-center hover:bg-olive/90 transition-colors"
        >
          Explore Wallet Workflows
        </a>
      </div>
    </section>
  )
}
