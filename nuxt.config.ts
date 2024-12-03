import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-'),
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
      googleTagManager: {
        id: process.env.NUXT_PUBLIC_SCRIPTS_GOOGLE_TAG_MANAGER_ID || '',
      },
    },
  },
  modules: ['@nuxt/eslint', '@nuxt/scripts', '@nuxtjs/google-fonts'],
  compatibilityDate: '2024-12-01',
})
