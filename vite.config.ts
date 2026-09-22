import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Add Vite plugins or deployment-specific build settings in this central config.
export default defineConfig({
  // The site is served from https://oxyenjoyer.github.io/PRTF/ on GitHub Pages.
  base: '/PRTF/',
  plugins: [react()],
})
