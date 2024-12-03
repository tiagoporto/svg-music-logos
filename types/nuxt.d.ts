import type { NuxtConfig as DefaultNuxtConfig } from 'nuxt/config'

declare module 'nuxt/schema' {
  interface NuxtConfig extends DefaultNuxtConfig {
    gtm: { id?: string }
  }
}
