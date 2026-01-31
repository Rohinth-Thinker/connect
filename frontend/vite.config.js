import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import basicSsl from "@vitejs/plugin-basic-ssl";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), basicSsl()],
  server: {
    host: true,
    https: true,
    proxy: {
      "/api": "http://localhost:3000/",
    },
    
    allowedHosts: ["average-beads-touched-studio.trycloudflare.com"],
  }
})
