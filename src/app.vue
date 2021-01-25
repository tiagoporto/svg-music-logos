<template>
  <div>
    <div id="jumbotron" class="jumbotron"></div>

    <app-header
      v-once
      :search="search"
      :artists="artists"
      :logos="logos"
      :origins="origins"
      :genres="genres"
    ></app-header>

    <main v-if="renderCards" class="card-container">
      <card
        v-for="(band, index) in filteredLogos"
        :key="index"
        :band="band"
      ></card>
    </main>

    <back-top></back-top>

    <app-footer v-once></app-footer>
  </div>
</template>

<script>
import './styles'
import { artists, genres, logos, origins } from './data.js'
import AppFooter from './components/footer/AppFooter.vue'
import AppHeader from './components/header/AppHeader.vue'
import BackTop from './components/back-top/BackTop.vue'
import Card from './components/card/Card.vue'
import { page, event } from 'vue-analytics'

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    Card,
    BackTop,
  },
  data() {
    return {
      renderCards: false,
      artists,
      logos,
      genres,
      origins,
      search: {
        band: '',
        genre: '',
        origin: '',
      },
    }
  },
  computed: {
    filteredLogos() {
      const query = {}

      this.search.band && (query.q = this.search.band)
      this.search.genre && (query.genre = this.search.genre)
      this.search.origin && (query.origin = this.search.origin)

      if (this.search.band || this.search.genre || this.search.origin) {
        this.$router.replace({
          name: 'search',
          query,
        })
      }

      if (this.search.genre) {
        if (process.env.NODE_ENV === 'production') {
          this.$ga.event({
            eventCategory: 'search',
            eventAction: 'select',
            eventLabel: `Genre ${this.search.genre}`,
          })
        }
      }

      if (this.search.origin) {
        if (process.env.NODE_ENV === 'production') {
          this.$ga.event({
            eventCategory: 'search',
            eventAction: 'select',
            eventLabel: `Origin ${this.search.origin}`,
          })
        }
      }

      const context = this

      return context.logos.filter((band) => {
        const searched = context.search
        const name = band.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            searched.band
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          )
        const genre =
          (!searched.genre && !band.genre) ||
          !searched.genre ||
          (band.genre && band.genre.includes(searched.genre))
        const origin =
          (!searched.origin && !band.origin) ||
          !searched.origin ||
          (band.origin && band.origin.includes(searched.origin))

        return name && origin && genre
      })
    },
  },
  mounted() {
    this.track()
    this.$nextTick(() => {
      this.$route.query.q && (this.search.band = this.$route.query.q)
      this.$route.query.origin &&
        (this.search.origin = this.$route.query.origin)
      this.$route.query.genre && (this.search.genre = this.$route.query.genre)

      if (process.env.NODE_ENV === 'production') {
        this.$ga.page(location.pathname)
      }
    })

    const bands = this.filteredLogos
    const promises = []

    for (let index = 0; index < 6; index++) {
      const band = bands[index]
      promises[index] = fetch(`logos/${band.folder}/${band.logo.svg}`)
    }

    Promise.all([
      promises[0],
      promises[1],
      promises[2],
      promises[3],
      promises[4],
      promises[5],
    ]).then((message) => {
      this.renderCards = true
    })
  },
  methods: {
    track() {
      const hostname = window.location && window.location.hostname
      const isMyDomain = hostname === 'tiagoporto.github.io'

      if (!isMyDomain && hostname !== 'localhost') {
        page({
          page: window.location.href.replace(/https?:\/\//, ''),
          title: document.title,
          location: window.location.origin,
        })
        event({
          eventLabel: 'Unknown access',
          eventCategory: 'unknown_user',
          eventAction: 'unknown_access',
        })
      }
    },
  },
}
</script>
