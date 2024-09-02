<script lang="ts" setup>
// import 'svg-to-inline'
import CountryFlag from 'vue-country-flag-next'
import FlagIso from './FlagIso.json'
import './Card.styl'

const props = defineProps<{
  title: string
  link: string
  genres?: string[]
  origins: string[]
  logo: {}
}>()

const { title, link, genres, origins, logo } = props
</script>

<template>
  <div class="card">
    <!-- <svg-to-inline
      class="logo"
      :path="logo.svg"
      :class-name="logo.className"
      :lazy="true"
    ></svg-to-inline> -->

    <div class="card__content">
      <h2 class="card__title">{{ title }}</h2>

      <h2>
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
          <CountryFlag :country="FlagIso[origin]" />
          {{ origin }}
          <template v-if="index < origins.length - 1">/</template>
        </template>
      </p>
      <p>Reference: {{ logo.title }}</p>
    </div>

    <div class="card__footer">
      <button class="card__button">Download SVG</button>
    </div>
  </div>
</template>
