import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/tera': {
        target: 'https://www.terawallet.app',
        changeOrigin: true,
        bypass(req) {
          const p = path.join(process.cwd(), 'public', req.url?.split('?')[0] || '')
          if (fs.existsSync(p)) return req.url
        },
      },
      '/assets': {
        target: 'https://www.terawallet.app',
        changeOrigin: true,
        bypass(req) {
          const p = path.join(process.cwd(), 'public', req.url?.split('?')[0] || '')
          if (fs.existsSync(p)) return req.url
        },
      },
    },
  },
})

