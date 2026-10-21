import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Served under /pokedex/ on Vercel (see /vercel.json).
  base: '/pokedex/',
  build: { outDir: 'dist/pokedex' },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8082',
    },
  },
})
