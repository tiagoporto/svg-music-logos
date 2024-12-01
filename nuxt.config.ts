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

  scripts: {
    registry: {
      googleTagManager: true,
    },
  },
  runtimeConfig: {
    public: {
      scripts: {
        googleTagManager: {
          // .env
          // NUXT_PUBLIC_SCRIPTS_GOOGLE_TAG_MANAGER_ID=<your-id>
          id: '',
        },
      },
    },
  },

  modules: ['@nuxt/eslint', '@nuxt/scripts'],
  compatibilityDate: '2024-12-01',
})
