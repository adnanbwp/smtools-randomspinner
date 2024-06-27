import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/smtools-randomspinner/',
  server: {
    hmr: {
      overlay: false,
    },
  },
  // Disable caching
  optimizeDeps: {
    force: true
  },
  clearScreen: false
})