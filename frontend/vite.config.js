import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{port:5173},
  theme: {
    extend: {
      colors:{
        'primary': '#5f6FFF'
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200, 1fr))'
      }
    },
  }
});