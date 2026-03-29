import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'unthreatening-puritanically-eric.ngrok-free.dev'
    ]
  },
  optimizeDeps: {
    include: ['framer-motion', 'lucide-react', 'react', 'react-dom'],
  }
})
