<script lang="ts" setup>
// @ts-expect-error: missing type
import CountryFlag from '@dzangolab/vue-country-flag-icon'
import '@dzangolab/vue-country-flag-icon/dist/CountryFlag.css'

import type { Logo, Origins } from '#shared/schema'

import flagIso from './FlagIso.json'

interface CardProps {
  title: string
  titleTemplate?: string
  link: string
  genres?: string[]
  origins: Origins[]
  logo: Logo
}

const { gtag } = useGtag()
const {
  title,
  link,
  genres,
  origins,
  logo,
  titleTemplate,
} = defineProps<CardProps>()

const handleClick = async (path: string) => {
  const filePath = path.split('/')
  const filename = filePath.at(-1)

  const link = document.createElement('a')
  link.href = path
  if (filename) {
    link.download = filename
  }
  link.click()

  if (process.env.NODE_ENV === 'production') {
    gtag('event', 'svg-music-logos', {
      event_category: 'Download SVG',
      event_label: filename,
    })
  }
}
</script>

<template>
  <div
    class="card"
    :class="{ 'card--inverse': logo.inverse }"
    :style="logo.backgroundColor ? { background: logo.backgroundColor } : {}"
    data-testid="card"
  >
    <div class="card__content">
      <Logo :logo="logo" :artist="title" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <h2 v-if="titleTemplate" class="card__title" v-html="titleTemplate" />

      <h2 v-else class="card__title">
        <a
          class="card__link"
          :href="link"
          :title="`${title}'s website`"
          target="_blank"
          rel="noopener"
        >
          {{ title }}
        </a>
      </h2>

      <p v-if="genres">
        <template v-for="(genre, index) in genres">
          {{ genre }}
          <template v-if="index < genres.length - 1">
            •
          </template>
        </template>
      </p>

      <p>
        <template v-for="(origin, index) in origins" :key="index">
          <CountryFlag :iso="flagIso[origin]" :title="origin" />
          {{ origin }}
          <template v-if="index < origins.length - 1">
            /
          </template>
        </template>
      </p>

      <p>{{ logo.title }}</p>
    </div>

    <button class="card__button" @click="handleClick(logo.svg)">
      Download SVG
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use './Card';
</style>
