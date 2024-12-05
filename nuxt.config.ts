import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  app: {
    baseURL: '/svg-music-logos/',
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-'),
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
  runtimeConfig: {
    public: {
      scripts: {
        googleAnalytics: {
          id: '',
        },
      },
    },
  },
  modules: ['@nuxt/eslint', '@nuxt/scripts', '@nuxtjs/google-fonts'],
  compatibilityDate: '2024-12-01',
})
