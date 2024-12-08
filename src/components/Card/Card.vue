<script lang="ts" setup>
import 'svg-to-inline/svg-to-inline.js'
import CountryFlag from 'vue-country-flag-next'
import flagIso from './FlagIso.json'
import type { Logo, Origins } from '../../server/db/schema'

interface CardProps {
  title: string
  titleTemplate?: string
  link: string
  genres?: string[]
  origins: Origins[]
  logo: Logo
}

const { title, link, genres, origins, logo, titleTemplate } =
  defineProps<CardProps>()
const { proxy } = useScriptGoogleAnalytics()

const handleClick = async (path: string) => {
  const filePath = path.split('/')
  const filename = filePath[filePath.length - 1]

  const link = document.createElement('a')
  link.href = path
  link.download = filename
  link.click()

  if (process.env.NODE_ENV === 'production') {
    // @ts-expect-error: broken types form module
    proxy.gtag('event', 'click', {
      event_category: 'download',
      event_label: 'Download SVG',
      value: filename,
    })
  }
}
</script>

<template>
  <div class="card" :class="{ 'card--inverse': logo.inverse }">
    <Logo :logo="logo" />

    <div class="card__content">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <h2 v-if="titleTemplate" class="card__title" v-html="titleTemplate"></h2>

      <h2 v-else class="card__title">
        <a
          class="card__link"
          :href="link"
          :title="`${title}'s website`"
          target="_blank"
        >
          {{ title }}
        </a>
      </h2>

      <p v-if="genres">
        Genre:
        <template v-for="(genre, index) in genres">
          {{ genre }}
          <template v-if="index < genres.length - 1">•</template>
        </template>
      </p>

      <p>
        Origin:
        <template v-for="(origin, index) in origins" :key="index">
          <CountryFlag :country="flagIso[origin]" />
          {{ origin }}
          <template v-if="index < origins.length - 1">/</template>
        </template>
      </p>
      <p>Reference: {{ logo.title }}</p>
    </div>

    <div class="card__footer">
      <button class="card__button" @click="handleClick(logo.svg)">
        Download SVG
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './Card';
</style>
