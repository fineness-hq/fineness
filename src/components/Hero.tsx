import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const contractAddress = '0x3c12e57fa7817a86ce7c254db9ea5fe639e233f8'

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const headingText = [
    ['Your', 'assets.'],
    ['Your', 'rules.'],
    ['Your', 'authority.']
  ]

  return (
    <header id="home" className="relative min-h-screen bg-white bg-grid pt-20 overflow-hidden border-b border-beige-dark">
      {/* Background Panorama Parallax Mountains */}
      <div className="absolute left-0 right-0 bottom-16 h-[42vh] min-h-[300px] overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
          className="flex flex-row h-full w-[400%] opacity-35"
        >
          <img
            src="https://www.terawallet.app/assets/files/5ac4332381f6a942fa15.png"
            alt="background header"
            className="h-full w-auto flex-shrink-0 object-cover"
          />
          <img
            src="https://www.terawallet.app/assets/files/5ac4332381f6a942fa15.png"
            alt="background header"
            className="h-full w-auto flex-shrink-0 object-cover"
          />
        </motion.div>
      </div>

      {/* Decorative vertical grid lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none z-0">
        <div className="absolute left-[33.33%] top-0 bottom-0 dashed-line-v">
          <span className="absolute top-[480px] -left-[7px] text-[#E75800] text-sm font-mono font-bold leading-none select-none">+</span>
        </div>
        <div className="absolute left-[66.66%] top-0 bottom-0 dashed-line-v">
          <span className="absolute top-[180px] -left-[7px] text-[#E75800] text-sm font-mono font-bold leading-none select-none">+</span>
          <span className="absolute top-[680px] -left-[7px] text-[#E75800] text-sm font-mono font-bold leading-none select-none">+</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-0">
        {/* Main 2-Col Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Address, Badge, Description */}
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-[clamp(44px,5.5vw,76px)] leading-[1.05] tracking-[-0.04em] font-medium text-[#1d2b23]">
              {headingText.map((line, lineIdx) => (
                <div key={lineIdx} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.7, delay: lineIdx * 0.15, ease: [0.2, 0.7, 0.25, 1] }}
                  >
                    {line.join(' ')}
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* Contract Address Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="border border-beige-dark/90 bg-white/70 backdrop-blur-sm p-4 space-y-3 max-w-xl shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#616060] font-medium">Contract Address</span>
                <span className="font-mono text-xs sm:text-sm text-dark truncate flex-1 font-medium">{contractAddress}</span>
                <button
                  onClick={handleCopy}
                  className="font-mono text-xs uppercase tracking-wider underline underline-offset-4 text-dark hover:text-olive transition-colors font-medium cursor-pointer"
                >
                  {copied ? 'COPIED!' : 'COPY'}
                </button>
              </div>
              <div>
                <a
                  href={`https://dexscreener.com/search?q=${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider underline underline-offset-4 text-dark hover:text-olive transition-colors inline-flex items-center gap-1 font-medium"
                >
                  Dexscreener ↗
                </a>
              </div>
            </motion.div>

            {/* 200M $TERA BURNED Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="bg-[#768143] text-white font-mono text-[11px] uppercase tracking-[0.2em] py-3.5 px-6 max-w-xl flex items-center justify-between font-medium shadow-sm"
            >
              <span>200M $TERA BURNED</span>
              <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
            </motion.div>

            {/* Monospace Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.08em] leading-[1.65] max-w-lg text-[#18251e]"
            >
              Private authorization for supervised real-world asset workflows. The agent thinks. Tera enforces. You approve.
            </motion.p>
          </div>

          {/* Right Column: Exact Step7 Interactive Diagram */}
          <div className="relative hidden lg:flex justify-center items-center h-[520px]">
            {/* Center Box with Orange rotating frame & Corner angles */}
            <div className="relative w-[280px] h-[280px] flex items-center justify-center">
              
              {/* Outer Diagonal Hatch Lines Texture */}
              <div className="absolute inset-[-40px] pointer-events-none opacity-20 overflow-hidden">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="8" stroke="#18251e" strokeWidth="1.2" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
                </svg>
              </div>

              {/* Orange Spinning Diamond Outline */}
              <div
                className="absolute inset-4 border border-[#E75800]/60 pointer-events-none"
                style={{
                  animation: 'tera-load-orbit 14s linear infinite',
                }}
              />

              {/* Outer Corner Angle Brackets */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#768143]" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#768143]" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#768143]" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#768143]" />
              </div>

              {/* Central Beige Box with Floating 3D Logo */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                className="w-32 h-32 bg-[#e8e9dc] border border-[#768143]/30 flex items-center justify-center shadow-md relative z-10"
              >
                <img
                  src="https://www.terawallet.app/tera/logo.png"
                  alt="Tera Logo"
                  className="w-16 h-16 object-contain drop-shadow-[0_8px_12px_rgba(86,96,67,0.18)]"
                />
              </motion.div>

              {/* Orbiting Sheet 1: Top Node (User ID card) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
              >
                <div className="w-10 h-12 bg-white border border-beige-dark shadow-sm flex flex-col items-center justify-center p-1 relative">
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border-t border-r border-beige-dark" />
                  <svg width="16" height="18" viewBox="0 0 13.75 16.25" fill="none">
                    <path d="M 12.5 0 L 1.25 0 C 0.56 0 0 0.56 0 1.25 L 0 15 C 0.001 15.69 0.56 16.249 1.25 16.25 L 12.5 16.25 C 13.19 16.25 13.75 15.69 13.75 15 L 13.75 1.25 Z" stroke="#768143" strokeWidth="1" />
                    <circle cx="6.8" cy="8" r="2.5" fill="#768143" />
                  </svg>
                </div>
                <div className="w-[1px] h-6 border-l border-dashed border-dark/40" />
              </motion.div>

              {/* Orbiting Sheet 2: Right Node (Server / Ledger document) */}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 3.6, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
                className="absolute top-1/2 -right-20 -translate-y-1/2 flex items-center gap-2 z-20"
              >
                <div className="w-6 h-[1px] border-t border-dashed border-dark/40" />
                <div className="w-10 h-12 bg-white border border-beige-dark shadow-sm flex flex-col items-center justify-center p-1.5 relative">
                  <div className="w-4 h-1.5 bg-[#768143] mb-1" />
                  <div className="w-4 h-1.5 bg-[#768143]" />
                </div>
              </motion.div>

              {/* Orbiting Sheet 3: Bottom Node (Credit / Vault Card) */}
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 3.4, ease: 'easeInOut', repeat: Infinity, delay: 0.8 }}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
              >
                <div className="w-[1px] h-6 border-l border-dashed border-dark/40" />
                <div className="w-12 h-9 bg-white border border-beige-dark shadow-sm flex flex-col justify-center px-2">
                  <div className="w-full h-1.5 bg-[#768143]/70 mb-1" />
                  <div className="w-4 h-1 bg-[#18251e]/40" />
                </div>
              </motion.div>

              {/* Left Incoming Stream Dotted Arrows */}
              <div className="absolute top-1/2 -left-20 -translate-y-1/2 flex flex-col gap-2">
                <div className="w-12 h-[1px] border-t border-dashed border-dark/40" />
                <div className="w-12 h-[1px] border-t border-dashed border-[#E75800]" />
                <div className="w-12 h-[1px] border-t border-dashed border-dark/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Dual Full-Width CTA Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 mt-12 sm:mt-16 border-t border-beige-dark">
          <a
            href="https://www.terawallet.app/contacts#home"
            className="border-b sm:border-b-0 sm:border-r border-beige-dark bg-white py-5 text-center font-mono text-[12px] uppercase tracking-[0.25em] font-medium text-dark hover:bg-dark-deep hover:text-white transition-colors cursor-pointer"
          >
            Explore the Wallet
          </a>
          <a
            href="#process"
            className="bg-[#1d2b23] text-white py-5 text-center font-mono text-[12px] uppercase tracking-[0.25em] font-medium hover:bg-dark transition-colors cursor-pointer"
          >
            How it Works
          </a>
        </div>

        {/* Advantages 3-Column Strip (From real terawallet design) */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-beige-dark/70 py-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[#616060]">
          <div className="py-2 flex items-center justify-center gap-2">
            <span>YOUR KEYS REMAIN YOURS</span>
          </div>
          <div className="py-2 border-t md:border-t-0 md:border-x border-beige-dark/70 flex items-center justify-center gap-3">
            <span className="text-[#E75800]">→ → →</span>
            <span>FIVE DETERMINISTIC GATES</span>
          </div>
          <div className="py-2 border-t md:border-t-0 border-beige-dark/70 flex items-center justify-center gap-2">
            <span>FROM PROPOSAL TO YOUR APPROVAL</span>
          </div>
        </div>

      </div>
    </header>
  )
}
