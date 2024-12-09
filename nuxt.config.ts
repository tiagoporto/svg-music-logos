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
  modules: [
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxtjs/google-fonts',
    '@nuxt/test-utils/module',
  ],
  compatibilityDate: '2024-12-01',
})
