import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: parseInt(process.env.PORT) || 3000 // Use Railway's port if available
  },
  build: {
    outDir: 'dist' // Ensure build output goes to 'dist'
  },
  esbuild: {
    loader: "jsx",
    include: /[^node_modules]*\.[jt]sx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx'
      }
    }
  }
})