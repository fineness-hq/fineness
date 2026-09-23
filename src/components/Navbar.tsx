import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-beige-dark">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 py-3">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <img src="https://www.terawallet.app/tera/logo.png" alt="Tera Wallet" className="w-4 h-4" />
          <span className="font-mono text-sm font-medium tracking-widest uppercase text-dark">Tera Wallet</span>
        </a>

        {/* Right Actions */}
        <div className="flex items-center gap-0">
          {/* Language */}
          <div className="flex items-center gap-2 border border-beige-dark px-4 py-2.5 cursor-pointer">
            <span className="font-mono text-[11px] tracking-wider uppercase text-gray-dark">Language</span>
            <span className="font-mono text-[11px] tracking-wider uppercase font-medium">EN</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-1">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Open Wallet */}
          <a
            href="https://www.terawallet.app/dashboard/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 border border-dark-deep bg-dark-deep/5 px-5 py-2.5 font-mono text-[11px] tracking-wider uppercase font-medium text-dark-deep hover:bg-dark-deep hover:text-white transition-colors"
          >
            Open Wallet ↗
          </a>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 bg-dark-deep text-white px-5 py-2.5 font-mono text-[11px] tracking-wider uppercase font-medium hover:bg-dark transition-colors"
          >
            Menu
            <div className="flex flex-col gap-1.5">
              <div className="w-5 h-[1.5px] bg-white" />
              <div className="w-5 h-[1.5px] bg-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-[52px] bg-white z-40 p-8">
          <nav className="flex flex-col gap-4 font-mono text-sm uppercase tracking-widest">
            <a href="#home" className="py-2 border-b border-beige-dark">Home</a>
            <a href="https://www.terawallet.app/about" className="py-2 border-b border-beige-dark">About</a>
            <a href="https://www.terawallet.app/solutions" className="py-2 border-b border-beige-dark">Solutions</a>
            <a href="https://www.terawallet.app/projects" className="py-2 border-b border-beige-dark">Workflows</a>
            <a href="https://www.terawallet.app/contacts" className="py-2 border-b border-beige-dark">Community</a>
          </nav>
        </div>
      )}
    </nav>
  )
}
