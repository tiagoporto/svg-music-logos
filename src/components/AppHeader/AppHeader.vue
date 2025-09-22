<script setup lang="ts">
import { TITLE } from '../../constants/site'
import type { Artist } from '../../server/db/schema'
import { debounce } from 'throttle-debounce'
const route = useRoute()
const { data: artists, status: artistsStatus } = await useFetch('/api/artists')
// const { data: genres } = useFetch('/api/genres')
// const { data: origin } = useFetch('/api/origins')
const { data: logos, status: logosStatus } = useFetch('/api/logos')

const router = useRouter()
const header = ref<HTMLElement | null>(null)
const className = ref('header')
const selectedArtist = ref<Artist | null>(null)

const setSelectedArtist = (artistToSet: string) => {
  const selected = artists.value?.artists.find(
    (artist) => artist.id === artistToSet,
  )
  selectedArtist.value = toRaw(selected) || null
}

setSelectedArtist(route.params.artistId as string)

watch(route, (newRoute) => {
  if (newRoute.params.artistId) {
    setSelectedArtist(newRoute.params.artistId as string)
  } else {
    selectedArtist.value = null
  }
})

const changeRoute = (value: string) => {
  if (value) {
    return router.push({
      name: 'artist-artistId',
      params: { artistId: value },
    })
  }

  return router.push({ name: 'index' })
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
          <NuxtImg width="350" :alt="TITLE" src="/favicon.svg" />
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
        <br />
        The brands and symbols should only be used to represent which artists
        they refer.
      </p>

      <v-autocomplete
        v-model="selectedArtist"
        clearable
        variant="solo"
        placeholder="Search Artist"
        :items="artists?.artists || []"
        item-title="name"
        item-value="id"
        :disabled="artistsStatus !== 'success'"
        data-testid="artist-autocomplete"
        @update:model-value="(value) => changeRoute(value as unknown as string)"
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
      <ListenOnButton />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use './AppHeader';
</style>
