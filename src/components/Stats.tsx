import { useState, useEffect, useRef } from 'react'

export default function Stats() {
  const [count, setCount] = useState(59)
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const startCount = 59
    const endCount = 100
    const duration = 1200
    let startTime: number | null = null
    let rafId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const current = Math.floor(startCount + (endCount - startCount) * progress)
      setCount(current)
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      }
    }

    if (typeof IntersectionObserver !== 'undefined' && sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            rafId = requestAnimationFrame(step)
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(sectionRef.current)
      return () => {
        observer.disconnect()
        if (rafId) cancelAnimationFrame(rafId)
      }
    } else {
      rafId = requestAnimationFrame(step)
      return () => {
        if (rafId) cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="results" className="relative bg-beige bg-grid py-24">
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute left-[35%] top-0 bottom-0 dashed-line-v" />
        <div className="absolute left-[65%] top-0 bottom-0 dashed-line-v" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="section-badge mb-6">
          <span className="num">04</span>
          <span>Results</span>
        </div>
        <h2 className="text-[clamp(36px,4vw,52px)] leading-tight font-medium text-dark mb-16">
          Authority by design
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            { value: '2X', label: 'Deterministic\nGates' },
            { value: `${count}%`, label: 'Owner\nAuthority' },
            { value: '6+', label: 'Roadmap\nPhases' },
          ].map((stat, i) => (
            <div key={i} className="border-t border-dashed border-beige-dark py-12 px-4">
              <div className="text-[clamp(48px,6vw,96px)] font-light leading-none text-dark mb-6">
                {stat.value}
              </div>
              <p className="font-mono text-[12px] uppercase tracking-wider whitespace-pre-line text-gray-dark">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
