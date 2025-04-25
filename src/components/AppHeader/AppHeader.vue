<script setup lang="ts">
import { TITLE } from '../../constants/site'
import type { Artist } from '../../server/db/schema'
import { debounce } from 'throttle-debounce'
const { params } = useRoute()
const { data: artists, status: artistsStatus } = await useFetch('/api/artists')
// const { data: genres } = useFetch('/api/genres')
// const { data: origin } = useFetch('/api/origins')
const { data: logos, status: logosStatus } = useFetch('/api/logos')

const { gtag } = useGtag()
const router = useRouter()
const header = ref<HTMLElement | null>(null)
const className = ref('header')
const selectedArtist = ref<Artist | null>(null)

if (params.artistId) {
  const selected = artists.value?.artists.find(
    (artist) => artist.id === params.artistId,
  )
  selectedArtist.value = toRaw(selected) || null
}

const changeRoute = (value: string) => {
  if (value) {
    return router.push({
      name: 'artist-artistId',
      params: { artistId: value },
    })
  }

  return router.push({ name: 'index' })
}

const handleClick = (audioStreaming: 'YT Music' | 'Spotify') => {
  if (process.env.NODE_ENV === 'production') {
    gtag('event', 'svg-music-logos', {
      event_category: 'Listen On',
      event_label: audioStreaming,
    })
  }
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

      <p
        v-if="artistsStatus === 'success' && logosStatus === 'success'"
        class="header__count"
      >
        {{ artists?.count }} artists • {{ logos?.count }} logos
      </p>

      <p class="header__disclaimer">
        *All brands are trademarks of their respective bands or musicians.
        <br />
        The brands and symbols should only be used to represent which artists
        they refer.
      </p>

      <v-btn
        color="light-blue-darken-3"
        append-icon="mdi-menu-down"
        size="x-large"
        tile
        class="mb-5"
      >
        Listen On

        <v-menu activator="parent">
          <v-list tile>
            <v-list-item
              href="https://music.youtube.com/playlist?list=PLKtV93YW2_X-Iu_iNpyMG03bWx8YTTAx6&feature=share"
              target="_blank"
              @click="handleClick('YT Music')"
            >
              <v-list-item-title>
                <v-icon icon="mdi-youtube" />
                YT Music</v-list-item-title
              >
            </v-list-item>

            <v-list-item
              href="https://open.spotify.com/playlist/20XHrsLWAJkgBBagZiURM5"
              target="_blank"
              @click="handleClick('Spotify')"
            >
              <v-list-item-title
                ><v-icon icon="mdi-spotify" /> Spotify</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>

      <v-autocomplete
        v-model="selectedArtist"
        clearable
        variant="solo"
        placeholder="Search Artist"
        :items="artists?.artists || []"
        item-title="name"
        item-value="id"
        :disabled="artistsStatus !== 'success'"
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
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use './AppHeader';
</style>
