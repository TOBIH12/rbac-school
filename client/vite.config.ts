import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        // Change this from http://localhost:5000 to your Render URL:
        target: 'https://rbac-school.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
