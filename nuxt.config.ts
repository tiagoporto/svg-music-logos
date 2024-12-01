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

  modules: ['@nuxt/eslint'],
})
