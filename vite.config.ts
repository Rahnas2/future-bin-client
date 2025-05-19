import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // host: true,
    host: '0.0.0.0', // Bind to all interfaces
    port: 5173,
    watch: {
      usePolling: true, // Fix file watching in Docker
      // interval: 1000,
    },
    hmr: {
      host: 'localhost', // Browser connects to localhost for HMR
      port: 5173,
      protocol: 'ws',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
