import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  dir: {
    public: '../public',
  },
  srcDir: 'src/',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: '',
  },
  googleFonts: {
    preconnect: true,
    display: 'swap',
    families: {
      Lato: [300, 400, 700],
    },
  },
  pwa: {
    strategies: 'generateSW',
    injectRegister: 'auto',
    // srcDir: 'service-worker',
    // filename: 'sw.ts',
    manifest: false,
    registerType: 'prompt',
    includeAssets: ['fonts/*.woff2'],
    injectManifest: {
      maximumFileSizeToCacheInBytes: 3000000,
      globPatterns: ['**/*.{js,css,html,png,ico}'],
    },
    registerWebManifestInRouteRules: true,
    client: {
      periodicSyncForUpdates: 3600,
      installPrompt: false,
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxtjs/google-fonts',
    '@nuxt/test-utils/module',
    '@vite-pwa/nuxt',
    'vuetify-nuxt-module',
    'nuxt-gtag',
    '@nuxt/image',
  ],
  compatibilityDate: '2024-12-01',
})
