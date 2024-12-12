import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  dir: {
    public: '../public',
  },
  srcDir: 'src/',
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-'),
    },
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  googleFonts: {
    preconnect: true,
    display: 'swap',
    families: {
      Lato: [300, 400, 700],
    },
  },
  scripts: {
    registry: {
      googleAnalytics: true,
    },
  },
  pwa: {
    strategies: 'injectManifest',
    injectRegister: 'auto',
    srcDir: 'service-worker',
    filename: 'sw.ts',
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
  runtimeConfig: {
    public: {
      scripts: {
        googleAnalytics: {
          id: '',
        },
      },
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxtjs/google-fonts',
    '@nuxt/test-utils/module',
    '@vite-pwa/nuxt',
  ],
  compatibilityDate: '2024-12-01',
})
