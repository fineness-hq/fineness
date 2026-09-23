import { useEffect, useRef } from 'react'
import './framer.css'
import framerBodyHtml from './framer-body.html?raw'
import SvgTemplates from './components/SvgTemplates'

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load native terawallet scripts for interactions & animations
    const scripts = [
      '/tera/preloader.js?v=1789076705',
      '/tera/site.js?v=20260915locale2',
      '/tera/cms-loader.js?v=1789077010',
      '/tera/navigation.js?v=1789077010',
    ]

    const addedScripts: HTMLScriptElement[] = []
    scripts.forEach(src => {
      const s = document.createElement('script')
      s.src = src
      s.async = false
      document.body.appendChild(s)
      addedScripts.push(s)
    })

    return () => {
      addedScripts.forEach(s => s.remove())
    }
  }, [])

  return (
    <div className="framer-body-wrapper">
      <SvgTemplates />
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: framerBodyHtml }}
      />
    </div>
  )
}
