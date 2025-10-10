import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false // Desabilitar em dev para teste real
      },
      includeAssets: ['icon-unilago.ico'],
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/_/, /\/api\//],
      },
      manifest: {
        name: 'UNILAGO - Área do Aluno',
        short_name: 'Área do Aluno',
        description: 'Portal do Aluno da UNILAGO - Faculdade de São José do Rio Preto. Acesse notas, horários, biblioteca e muito mais.',
        theme_color: '#1a202c',
        background_color: '#1a202c',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        categories: ['education', 'productivity'],
        lang: 'pt-BR',
        icons: [
          // {
          //   src: 'assets/pwa-192x192.png',
          //   sizes: '192x192',
          //   type: 'image/png'
          // },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // permite acesso pela rede (192.168.x.x)
    https: {
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.pem'),
    },
  },

})
