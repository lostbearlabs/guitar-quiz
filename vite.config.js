import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // The base is relative, because this app lives at /lostbearlabs.com/guitar-quiz
  base: './',
  plugins: [react()],
})
