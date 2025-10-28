<script setup lang="ts">
import { debounce } from 'throttle-debounce'

import { TITLE } from '../../constants/site'

const { data: artists, status: artistsStatus } = await useFetch('/api/artists')
const { data: logos, status: logosStatus } = useFetch('/api/logos')
const route = useRoute()
const selectedFilterBy = computed(
  () =>
    (typeof route.query.origin === 'string' ? route.query.origin : null) ||
    (typeof route.query.genre === 'string' ? route.query.genre : null),
)

const header = ref<HTMLElement | null>(null)
const className = ref('header')
const fixTopLine = debounce(5, () => {
  const element = globalThis

  if (header.value) {
    if (element.scrollY < 5) {
      return (className.value = 'header top')
    }

    className.value = 'header'
  }
})

onMounted(() => {
  window.addEventListener('wheel', fixTopLine)
})

onUnmounted(() => {
  window.removeEventListener('wheel', fixTopLine)
})
</script>

<template>
  <Jumbotron />

  <header ref="header" :class="className">
    <GithubCorner
      repo="https://github.com/tiagoporto/svg-music-logos"
    />

    <div class="header__main">
      <h1 class="header__title">
        <NuxtLink to="/">
          <NuxtImg
            width="350"
            :alt="TITLE"
            src="/logo.svg"
            :style="{ 'max-width': '100%' }"
          />
        </NuxtLink>
      </h1>

      <p>Music-related logos and symbols collection in SVG.</p>

      <p
        v-if="artistsStatus === 'success' && logosStatus === 'success'"
        class="header__count"
        data-happo-hide
      >
        {{ artists?.count }} artists • {{ logos?.count }} logos
      </p>

      <p class="header__disclaimer">
        *All brands are trademarks of their respective bands or musicians.
        <br>
        The brands and symbols should only be used to represent which artists
        they refer.
      </p>

      <ListenOnButton />

      <Search
        :artists="artists?.artists"
        :artists-status="artistsStatus"
        :selected-filter-by="selectedFilterBy"
      />
      <Filters :selected-filter-by="selectedFilterBy" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use './AppHeader';
</style>
