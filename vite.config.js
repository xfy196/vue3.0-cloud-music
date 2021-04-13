import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    hostname: "0.0.0.0",
    port: 3003,
    open: true,
    https: false,
    ssr: false,
    base: "./",
    outDir: "dist",
    proxy: {
      '/api': {
        target: 'https://musicapi.xxytime.top',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
