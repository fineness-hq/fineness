import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const menuLinks = [
    { title: 'HOME', href: '#home' },
    { title: 'ABOUT', href: 'https://www.terawallet.app/about#home' },
    { title: 'SOLUTIONS', href: 'https://www.terawallet.app/solutions#home' },
    { title: 'WORKFLOWS', href: 'https://www.terawallet.app/projects#home' },
    { title: 'COMMUNITY', href: 'https://www.terawallet.app/contacts#home' },
  ]

  const legalLinks = [
    { title: 'PRIVACY POLICY', href: 'https://www.terawallet.app/legal/privacy-policy#home' },
    { title: 'TERMS OF SERVICE', href: 'https://www.terawallet.app/legal/terms-of-service#home' },
    { title: '404', href: 'https://www.terawallet.app/404#home' },
  ]

  return (
    <footer id="footer" className="relative bg-white overflow-hidden border-t border-beige-dark">
      {/* Top Banner with Parallax Mountain Skyline */}
      <div className="relative h-[280px] sm:h-[340px] bg-[#f2f0ee] overflow-hidden border-b border-beige-dark">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
          className="flex flex-row h-full w-[400%] opacity-45 select-none pointer-events-none"
        >
          <img
            src="https://www.terawallet.app/assets/files/5ac4332381f6a942fa15.png"
            alt="background footer"
            className="h-full w-auto flex-shrink-0 object-cover"
          />
          <img
            src="https://www.terawallet.app/assets/files/5ac4332381f6a942fa15.png"
            alt="background footer"
            className="h-full w-auto flex-shrink-0 object-cover"
          />
        </motion.div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Massive Statement and Contacts */}
        <div className="py-14 sm:py-20 border-b border-dashed border-beige-dark">
          <h2 className="text-[clamp(36px,5.5vw,76px)] font-medium leading-[1.08] tracking-[-0.04em] text-[#1d2b23] mb-8">
            The agent proposes.<br />You stay in control.
          </h2>

          <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-mono text-[11px] uppercase tracking-[0.16em]">
            <a
              href="mailto:terawalletrh@outlook.com"
              className="text-[#18251e] hover:text-[#768143] transition-colors underline underline-offset-4"
            >
              terawalletrh@outlook.com
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/terawalletrh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#18251e] hover:text-[#768143] transition-colors underline underline-offset-4"
              >
                X
              </a>
              <a
                href="https://t.me/terawalletrh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#18251e] hover:text-[#768143] transition-colors underline underline-offset-4"
              >
                TG
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Menu & Form Grid (Original Framer Structure) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.3fr] border-b border-beige-dark">
          
          {/* Col 1: Main Menu */}
          <div className="py-10 md:py-14 pr-6 md:border-r border-dashed border-beige-dark">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#9e9e9e] mb-6 block">Menu</span>
            <nav className="flex flex-col gap-4 font-mono text-[13px] uppercase tracking-[0.14em] font-medium">
              {menuLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="text-[#18251e] hover:text-[#768143] hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-2"
                >
                  <span className="text-[#E75800] text-xs">·</span>
                  {item.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 2: Service / Legal Menu */}
          <div className="py-10 md:py-14 px-0 md:px-8 border-t md:border-t-0 md:border-r border-dashed border-beige-dark">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#9e9e9e] mb-6 block">Legal</span>
            <nav className="flex flex-col gap-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[#616060]">
              {legalLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="hover:text-dark hover:translate-x-1 transition-all duration-150"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact Form */}
          <div className="py-10 md:py-14 pl-0 md:pl-8 border-t md:border-t-0 border-dashed border-beige-dark">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#9e9e9e] mb-6 block">Demo Request</span>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#616060] block mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="YOUR NAME"
                  className="w-full border-b border-beige-dark py-2.5 font-mono text-[13px] uppercase tracking-wider bg-transparent outline-none focus:border-[#1d2b23] transition-colors text-dark"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#616060] block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL@ADDRESS.COM"
                  className="w-full border-b border-beige-dark py-2.5 font-mono text-[13px] uppercase tracking-wider bg-transparent outline-none focus:border-[#1d2b23] transition-colors text-dark"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1d2b23] text-white font-mono text-[11px] uppercase tracking-[0.22em] py-4 px-6 hover:bg-[#768143] transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm relative group overflow-hidden"
                >
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#E75800] group-hover:w-full transition-all duration-300 -z-0 opacity-20" />
                  <span className="relative z-10">
                    {submitted ? 'REQUEST RECEIVED ✓' : 'EXPLORE THE DEMO ↗'}
                  </span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar: OBERON / OWNER APPROVED */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[15px] font-bold uppercase tracking-[0.35em] text-[#18251e]">
            OBERON
          </span>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#616060]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#768143]" />
            <span>OWNER APPROVED</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
