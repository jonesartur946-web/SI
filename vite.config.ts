import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // <- ADICIONE ESSA LINHA
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
  alias: {
    '@': '/src',
  },
},
})

