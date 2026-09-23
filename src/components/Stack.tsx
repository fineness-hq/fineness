import { motion } from 'framer-motion'

export default function VerificationStack() {
  const stackItems = [
    { src: 'https://www.terawallet.app/tera/stack-3.svg', alt: 'Stack 3', pos: 'top-[30%] left-[10%]' },
    { src: 'https://www.terawallet.app/tera/stack-7.svg', alt: 'Stack 7', pos: 'top-[20%] right-[15%]' },
    { src: 'https://www.terawallet.app/tera/stack-4.svg', alt: 'Stack 4', pos: 'top-[50%] left-[5%]' },
    { src: 'https://www.terawallet.app/tera/stack-6.svg', alt: 'Stack 6', pos: 'top-[45%] right-[8%]' },
    { src: 'https://www.terawallet.app/tera/stack-2.svg', alt: 'Stack 2', pos: 'bottom-[20%] left-[18%]' },
    { src: 'https://www.terawallet.app/tera/stack-5.svg', alt: 'Stack 5', pos: 'top-[12%] left-[45%]' },
    { src: 'https://www.terawallet.app/tera/stack-1.svg', alt: 'Stack 1', pos: 'bottom-[10%] right-[35%]' },
    { src: 'https://www.terawallet.app/tera/stack-8.svg', alt: 'Stack 8', pos: 'bottom-[25%] right-[16%]' },
  ]

  const radarLines = [
    { rotate: 0, opacity: 0.5 },
    { rotate: -15, opacity: 0.2 },
    { rotate: -30, opacity: 0.5 },
    { rotate: -60, opacity: 0.2 },
    { rotate: 30, opacity: 0.5 },
    { rotate: 60, opacity: 0.2 },
    { rotate: 90, opacity: 0.5 },
  ]

  return (
    <section className="relative bg-white bg-grid py-20 border-b border-beige-dark overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute left-[33.33%] top-0 bottom-0 dashed-line-v">
          <span className="absolute top-[200px] -left-[7px] text-[#E75800] text-sm font-mono font-bold select-none">+</span>
        </div>
        <div className="absolute left-[66.66%] top-0 bottom-0 dashed-line-v">
          <span className="absolute top-[400px] -left-[7px] text-[#E75800] text-sm font-mono font-bold select-none">+</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Part */}
        <div className="mb-12">
          <div className="section-badge mb-6">
            <span className="num">07</span>
            <span>Stack</span>
          </div>
          <h2 className="text-[clamp(36px,4.5vw,60px)] leading-[1.08] tracking-[-0.03em] font-medium text-[#18251e]">
            The verification stack
          </h2>
        </div>

        {/* Animated Constellation Radar Diagram */}
        <div className="relative w-full h-[520px] lg:h-[620px] flex items-center justify-center my-6">
          
          {/* Rotating Radar Cross Lines */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {radarLines.map((line, i) => (
              <div
                key={i}
                className="absolute w-[800px] h-[1px] border-t border-dashed border-[#9e9e9e]"
                style={{
                  transform: `rotate(${line.rotate}deg)`,
                  opacity: line.opacity,
                }}
              />
            ))}
          </motion.div>

          {/* Dotted Radar Rings */}
          <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-[#9e9e9e]/30 pointer-events-none" />
          <div className="absolute w-[520px] h-[520px] rounded-full border border-dashed border-[#9e9e9e]/20 pointer-events-none" />
          <div className="absolute w-[740px] h-[740px] rounded-full border border-dashed border-[#9e9e9e]/15 pointer-events-none" />

          {/* Blueprint Labels */}
          <div className="absolute top-[28%] left-[36%] font-mono text-[10px] uppercase tracking-widest border border-beige-dark px-2 py-0.5 bg-white/80 z-20 shadow-xs">
            POL
          </div>
          <div className="absolute top-[24%] right-[32%] font-mono text-[10px] uppercase tracking-widest border border-beige-dark px-2 py-0.5 bg-white/80 z-20 shadow-xs">
            RISK
          </div>
          <div className="absolute bottom-[28%] right-[22%] font-mono text-[10px] uppercase tracking-widest border border-beige-dark px-2 py-0.5 bg-white/80 z-20 shadow-xs">
            AA
          </div>
          <div className="absolute bottom-[34%] right-[38%] font-mono text-[10px] uppercase tracking-widest border border-beige-dark px-2 py-0.5 bg-white/80 z-20 shadow-xs">
            ZK
          </div>
          <div className="absolute bottom-[20%] left-[26%] font-mono text-[10px] uppercase tracking-widest border border-beige-dark px-2 py-0.5 bg-white/80 z-20 shadow-xs">
            REG
          </div>

          {/* Center Logo with Animated Diamond */}
          <div className="relative z-20 flex items-center justify-center">
            {/* Spinning Diamond */}
            <div
              className="absolute w-24 h-24 border border-[#768143]/50 pointer-events-none"
              style={{ animation: 'tera-load-orbit 12s linear infinite' }}
            />
            {/* Corner Brackets */}
            <div className="absolute w-28 h-28 pointer-events-none">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#18251e]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#18251e]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#18251e]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#18251e]" />
            </div>
            {/* Floating 3D Logo */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
              className="w-16 h-16 bg-[#e8e9dc] border border-beige-dark shadow-sm flex items-center justify-center p-2"
            >
              <img
                src="https://www.terawallet.app/tera/logo.png"
                alt="Tera Logo"
                className="w-10 h-10 object-contain"
              />
            </motion.div>
          </div>

          {/* 8 Orbiting Stack Badges with Float Effect */}
          {stackItems.map((item, idx) => (
            <motion.div
              key={idx}
              animate={{ y: [0, idx % 2 === 0 ? -5 : 5, 0] }}
              transition={{ duration: 3 + (idx % 3) * 0.5, ease: 'easeInOut', repeat: Infinity, delay: idx * 0.2 }}
              className={`absolute ${item.pos} z-20`}
            >
              <div className="p-2 sm:p-3 bg-white border border-beige-dark/90 shadow-sm rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center hover:scale-110 hover:border-[#768143] transition-all cursor-pointer">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Description Message */}
        <div className="pt-8 border-t border-dashed border-beige-dark max-w-3xl">
          <p className="font-mono text-[13px] sm:text-[14px] uppercase tracking-[0.1em] leading-relaxed text-[#18251e]">
            ASSET REGISTRY, ELIGIBILITY PREFLIGHT, POLICY VAULT, RISK ENGINE AND OWNER APPROVAL WORK AS INDEPENDENT GATES.
          </p>
        </div>

      </div>
    </section>
  )
}
