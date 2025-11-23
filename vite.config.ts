import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' en './' asegura que los assets se carguen correctamente en GitHub Pages
  // independientemente del nombre del repositorio.
  base: './', 
})