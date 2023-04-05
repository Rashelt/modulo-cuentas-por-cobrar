import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ErrorOverlay } from 'vite-plugin-error-overlay'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ErrorOverlay()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
