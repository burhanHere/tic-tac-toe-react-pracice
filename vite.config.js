import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "unswerved-catachrestically-oren.ngrok-free.dev", // add your ngrok URL here
      "localhost", // keep localhost allowed
    ]
  }
})
