import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      '@' :'/src'
    }
  },
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFile:[],
    css: { 
      // Esta expresión regular le dice a Vitest que haga stub a todas las importaciones que terminen en .css
      include: /.+\.css/i
    },
    server: {
      deps: {
        inline: ['vuetify']
      }
    }
  },
  base: '/',
})