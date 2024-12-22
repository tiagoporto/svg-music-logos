<script setup lang="ts">
import { TITLE } from '../../constants/site'
import { debounce } from 'throttle-debounce'
const { data: artists } = useFetch('/api/artists')
// const { data: genres } = useFetch('/api/genres')
// const { data: origin } = useFetch('/api/origins')
const { data: logos } = useFetch('/api/logos')

const header = ref<HTMLElement | null>(null)
const className = ref('header')
const router = useRouter()

const changeRoute = (value: string) => {
  const { query } = useRoute()

  if (value) {
    return router.push({
      name: 'artist-artistId',
      params: { artistId: value },
      query,
    })
  }

  return router.push({ name: 'index', query })
}

// const changeGenre = (value: string | null) => {
//   const { query } = useRoute()
//   if (value) {
//     router.push({ path: '/', query: { ...query, genre: value }, replace: true })
//   }
// }

// const changeOrigin = (value: string | null) => {
//   const { query } = useRoute()

//   if (value) {
//     router.push({
//       path: '/',
//       query: { ...query, origin: value },
//       replace: true,
//     })
//   }
// }

const setPosition = debounce(5, () => {
  const element = window

  if (header.value) {
    if (element.scrollY < 5) {
      return (className.value = 'header top')
    }

    className.value = 'header'
  }
})

onMounted(() => {
  window.addEventListener('wheel', setPosition)
})

onUnmounted(() => {
  window.removeEventListener('wheel', setPosition)
})
</script>

<template>
  <Jumbotron />

  <header ref="header" :class="className">
    <GithubCorner
      repo="https://github.com/tiagoporto/svg-music-logos"
    ></GithubCorner>

    <div class="header__main">
      <h1 class="header__title">
        <NuxtLink to="/">
          <img :alt="TITLE" src="/favicon.svg" />
        </NuxtLink>
      </h1>

      <p>Music-related logos and symbols collection in SVG.</p>

      <p class="header__count">
        {{ artists?.count }} artists • {{ logos?.count }} logos
      </p>

      <p class="header__disclaimer">
        *All brands are trademarks of their respective bands or musicians.
        <br />
        The brands and symbols should only be used to represent which artists
        they refer.
      </p>

      <v-autocomplete
        clearable
        auto-select-first
        variant="solo"
        placeholder="Search Artist"
        :items="artists?.artists"
        item-title="name"
        item-value="id"
        @update:model-value="changeRoute"
      ></v-autocomplete>

      <!-- <v-select
        clearable
        auto-select-first
        variant="outlined"
        placeholder="Genres"
        :items="genres?.genres"
        @update:model-value="changeGenre"
      >
      </v-select>

      <v-select
        clearable
        auto-select-first
        variant="outlined"
        placeholder="Origins"
        :items="origin?.origins"
        @update:model-value="changeOrigin"
      >
      </v-select> -->
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use './AppHeader';
</style>
