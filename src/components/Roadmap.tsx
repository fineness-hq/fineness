export default function RoadmapSection() {
  return (
    <section className="relative bg-white bg-grid py-24">
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute left-[35%] top-0 bottom-0 dashed-line-v" />
        <div className="absolute left-[65%] top-0 bottom-0 dashed-line-v" />
      </div>
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="section-badge mb-6">
          <span className="num">10</span>
          <span>Roadmap</span>
        </div>
        <h2 className="text-[clamp(36px,4vw,52px)] leading-tight font-medium text-dark mb-12">
          Roadmap
        </h2>
        <div className="flex gap-3 mb-12">
          <span className="font-mono text-[11px] uppercase tracking-wider bg-olive text-white px-3 py-1.5">First Milestone</span>
          <span className="font-mono text-[11px] uppercase tracking-wider border border-beige-dark px-3 py-1.5">Next Milestone</span>
        </div>
        <div className="space-y-4 mb-16">
          <h3 className="font-mono text-[13px] uppercase tracking-wider font-medium">Readiness Before Execution</h3>
          <h3 className="font-mono text-[13px] uppercase tracking-wider font-medium">Every Action Needs Your Approval</h3>
          <h3 className="font-mono text-[13px] uppercase tracking-wider font-medium">Automation After an Audited Core</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <p className="font-mono text-[12px] uppercase tracking-wider text-olive font-medium">Readiness</p>
            <div className="flex gap-3">
              <div className="border border-dashed border-beige-dark p-4 flex-1">
                <span className="text-2xl font-light">A</span>
                <span className="font-mono text-[11px] text-gray-dark ml-1">/ phase</span>
              </div>
              <div className="border border-dashed border-beige-dark p-4 flex-1">
                <span className="text-2xl font-light">B</span>
                <span className="font-mono text-[11px] text-gray-dark ml-1">/ phase</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-mono text-[12px] uppercase tracking-wider text-olive font-medium">Authorization</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-gray-dark mb-2">Owner First</p>
            <div className="flex gap-3">
              <div className="border border-dashed border-beige-dark p-4 flex-1">
                <span className="text-2xl font-light">C</span>
                <span className="font-mono text-[11px] text-gray-dark ml-1">/ phase</span>
              </div>
              <div className="border border-dashed border-beige-dark p-4 flex-1">
                <span className="text-2xl font-light">D</span>
                <span className="font-mono text-[11px] text-gray-dark ml-1">/ phase</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-mono text-[12px] uppercase tracking-wider text-olive font-medium">Privacy</p>
            <div className="flex gap-3">
              <div className="border border-dashed border-beige-dark p-4 flex-1">
                <span className="text-2xl font-light">E</span>
                <span className="font-mono text-[11px] text-gray-dark ml-1">/ phase</span>
              </div>
              <div className="border border-dashed border-beige-dark p-4 flex-1">
                <span className="text-2xl font-light">F</span>
                <span className="font-mono text-[11px] text-gray-dark ml-1">/ phase</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-12">
          <a href="https://www.terawallet.app/contacts#home" className="border border-dark-deep py-4 text-center font-mono text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-dark-deep hover:text-white transition-colors">Explore the Wallet</a>
          <a href="https://www.terawallet.app/contacts#home" className="border border-dark-deep py-4 text-center font-mono text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-dark-deep hover:text-white transition-colors">View the Roadmap</a>
          <a href="https://www.terawallet.app/contacts#home" className="bg-dark-deep text-white py-4 text-center font-mono text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-dark transition-colors">Explore the Phases</a>
        </div>
      </div>
    </section>
  )
}

export const Roadmap = RoadmapSection
