export default function Roles() {
  const roles = [
    {
      title: 'RWA Owners',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="6" width="24" height="16" rx="1" stroke="#768143" strokeWidth="1.5" />
          <line x1="4" y1="18" x2="28" y2="18" stroke="#768143" strokeWidth="1" />
          <line x1="16" y1="22" x2="16" y2="26" stroke="#768143" strokeWidth="1.5" />
          <line x1="10" y1="26" x2="22" y2="26" stroke="#768143" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: 'Agent Developers',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <polyline points="4,24 12,10 20,16 28,6" stroke="#768143" strokeWidth="1.5" fill="none" />
          <polyline points="4,26 12,14 20,20 28,10" stroke="#768143" strokeWidth="1" strokeDasharray="3 2" fill="none" />
        </svg>
      ),
    },
    {
      title: 'Issuer Providers',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="6" y="4" width="20" height="24" rx="1" stroke="#768143" strokeWidth="1.5" />
          <line x1="10" y1="10" x2="22" y2="10" stroke="#768143" strokeWidth="1" />
          <line x1="10" y1="14" x2="18" y2="14" stroke="#768143" strokeWidth="1" />
          <line x1="10" y1="18" x2="20" y2="18" stroke="#768143" strokeWidth="1" />
        </svg>
      ),
    },
    {
      title: 'Verifiers',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10" stroke="#768143" strokeWidth="1.5" />
          <path d="M11 16L15 20L21 12" stroke="#768143" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: 'Governance',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="#768143" strokeWidth="1.5" fill="none" />
        </svg>
      ),
    },
    {
      title: 'Smart Accounts',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="8" width="24" height="16" rx="2" stroke="#768143" strokeWidth="1.5" />
          <circle cx="20" cy="16" r="4" stroke="#768143" strokeWidth="1" />
          <line x1="8" y1="14" x2="14" y2="14" stroke="#768143" strokeWidth="1" />
          <line x1="8" y1="18" x2="12" y2="18" stroke="#768143" strokeWidth="1" />
        </svg>
      ),
    },
  ]

  return (
    <section id="roles" className="relative bg-beige bg-grid py-24">
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute left-[35%] top-0 bottom-0 dashed-line-v" />
        <div className="absolute left-[65%] top-0 bottom-0 dashed-line-v" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="section-badge mb-6">
          <span className="num">06</span>
          <span>Environments</span>
        </div>
        <h2 className="text-[clamp(36px,4vw,52px)] leading-tight font-medium text-dark mb-6">
          A role<br />for everyone
        </h2>
        <p className="font-mono text-[13px] uppercase tracking-wider leading-relaxed text-gray-dark mb-16">
          Independent roles. Narrow permissions. Shared verification.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
          {roles.map((role, i) => (
            <div
              key={i}
              className="border border-dashed border-beige-dark p-8 lg:p-10 flex flex-col justify-between hover:bg-white/40 transition-colors"
            >
              <div className="mb-8">{role.icon}</div>
              <h3 className="font-mono text-[12px] uppercase tracking-wider text-dark">{role.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
