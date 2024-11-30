<script lang="ts" setup>
import 'svg-to-inline'
import CountryFlag from 'vue-country-flag-next'
import flagIso from './FlagIso.json'
import './Card.styl'

const props = defineProps<{
  title: string
  titleTemplate?: string
  link: string
  genres?: string[]
  origins: string[]
  logo: {}
}>()

const download = (event, band) => {
  console.log('band: ', band)
}

const { title, link, genres, origins, logo, titleTemplate } = props
</script>

<template>
  <div class="card" :class="{ 'card--inverse': logo.inverse }">
    <svg-to-inline
      :key="logo.title"
      class="logo"
      loading="loading"
      :path="logo.svg"
      :className="logo.className"
      lazy
    >
    </svg-to-inline>

    <div class="card__content">
      <h2 v-if="titleTemplate" class="card__title" v-html="titleTemplate"></h2>

      <h2 v-else class="card__title">
        <a class="card__link" :href="link" :title="`${title}'s website`">
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
        <template v-for="(origin, index) in origins">
          <CountryFlag :country="flagIso[origin]" />
          {{ origin }}
          <template v-if="index < origins.length - 1">/</template>
        </template>
      </p>
      <p>Reference: {{ logo.title }}</p>
    </div>

    <div class="card__footer">
      <button class="card__button" @click="download($event, title)">
        Download SVG
      </button>
    </div>
  </div>
</template>
