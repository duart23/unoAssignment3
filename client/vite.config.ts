import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  plugins: [vue()],

resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000', 
      changeOrigin: true,
    },
  },
},

})
