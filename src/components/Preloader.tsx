import { useState, useEffect } from 'react'

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('Opening workspace')
  const [exiting, setExiting] = useState(false)
  const [hidden, setHidden] = useState(false)

  const stages = [
    { threshold: 0, label: 'Opening workspace' },
    { threshold: 20, label: 'Document ready' },
    { threshold: 40, label: 'Typography' },
    { threshold: 60, label: 'Brand' },
    { threshold: 80, label: 'Interface' },
    { threshold: 100, label: 'Welcome to Tera' },
  ]

  const finish = () => {
    if (exiting) return
    setExiting(true)
    setTimeout(() => {
      setHidden(true)
      if (onComplete) onComplete()
    }, 950)
  }

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += 2
      if (current > 100) {
        clearInterval(interval)
        setProgress(100)
        setStage('Welcome to Tera')
        setTimeout(finish, 400)
      } else {
        setProgress(current)
        const match = [...stages].reverse().find(s => current >= s.threshold)
        if (match) setStage(match.label)
      }
    }, 28)

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKey)
    }
  }, [])

  if (hidden) return null

  return (
    <div
      id="tera-preloader"
      className={`tera-preloader ${exiting ? 'is-exiting' : ''}`}
      role="status"
      aria-label="Preparing Tera Wallet"
    >
      {/* 5 Vertical Shutters */}
      <div className="tera-load-shutters" aria-hidden="true">
        {[0, 1, 2, 3, 4].map(i => (
          <i
            key={i}
            style={{
              ['--i' as any]: i,
              transform: exiting ? 'translateY(-101%)' : 'none',
              transition: 'transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)',
              transitionDelay: `${i * 65}ms`,
            }}
          />
        ))}
      </div>

      {/* Top Bar */}
      <div
        className="tera-load-top"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'translateY(-12px)' : 'none',
          transition: 'opacity 0.22s, transform 0.3s',
        }}
      >
        <span className="tera-load-brand">TERA WALLET</span>
        <span className="tera-load-edition">Private by default / Owner approved</span>
      </div>

      {/* Center Hero */}
      <div
        className="tera-load-center"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'translateY(-12px)' : 'none',
          transition: 'opacity 0.22s, transform 0.3s',
        }}
      >
        {/* Rotating Diamond Frame & Floating Logo */}
        <div className="tera-load-mark">
          <img src="https://www.terawallet.app/tera/logo.png" alt="Tera" decoding="async" />
        </div>

        {/* TERA Letter Stagger */}
        <div className="tera-load-title" aria-hidden="true">
          {['T', 'E', 'R', 'A'].map((char, i) => (
            <span key={i} style={{ ['--i' as any]: i }}>
              {char}
            </span>
          ))}
        </div>

        <p className="tera-load-subtitle">Your assets. Your rules. Your authority.</p>

        {/* 5-track Progress Bars */}
        <div className="tera-load-track" aria-hidden="true">
          {[1, 2, 3, 4, 5].map(step => (
            <i key={step} data-active={String(progress >= step * 20)} />
          ))}
        </div>

        {/* Readout Status */}
        <div className="tera-load-readout">
          <span className="tera-load-stage">{stage}</span>
          <span className="tera-load-percent" aria-hidden="true">
            {String(progress).padStart(2, '0')} / 100
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="tera-load-bottom"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'translateY(-12px)' : 'none',
          transition: 'opacity 0.22s, transform 0.3s',
        }}
      >
        <span>Permission starts with you.</span>
        <button className="tera-load-skip" onClick={finish}>
          Enter site ↗
        </button>
      </div>
    </div>
  )
}
