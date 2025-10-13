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
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      },
      includeAssets: ['icon-unilago.ico', 'pwa-512x512.png'],
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/_/, /\/api\//],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
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
        id: '/',
        categories: ['education', 'productivity'],
        lang: 'pt-BR',
        prefer_related_applications: false,
        icons: [
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
  preview: {
    host: true,
    https: {
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.pem'),
    },
  }
})
