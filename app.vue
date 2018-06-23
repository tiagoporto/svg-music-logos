<template>
  <div id="svgMusicLogosApp">
    <div class="jumbotron" id="jumbotron"></div>

    <app-header :search="search" :artists="artists" :logos="logos" :origins="origins" :genres="genres" v-once></app-header>

    <main class="card-container">
      <card v-for="(band, index) in filteredLogos" :band="band" v-bind:key="index"></card>
    </main>

    <back-top></back-top>

    <app-footer v-once></app-footer>
  </div>
</template>

<script>
import {artists, genres, logos, origins} from './data.js'
import AppFooter from './components/footer/AppFooter.vue'
import AppHeader from './components/header/AppHeader.vue'
import BackTop from './components/back-top/BackTop.vue'
import Card from './components/card/Card.vue'

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    Card,
    BackTop
  },
  data () {
    return {
      artists,
      logos,
      genres,
      origins,
      search: {
        band: '',
        genre: '',
        origin: ''
      }
    }
  },
  computed: {
    filteredLogos () {
      const query = {}

      this.search.band && (query.q = this.search.band)
      this.search.genre && (query.genre = this.search.genre)
      this.search.origin && (query.origin = this.search.origin)

      if (this.search.band || this.search.genre || this.search.origin) {
        this.$router.replace({
          name: 'search',
          query
        })
      }

      if (this.search.genre) {
        if (process.env.NODE_ENV === 'production') {
          this.$ga.event({
            eventCategory: 'search',
            eventAction: 'select',
            eventLabel: `Genre ${this.search.genre}`
          })
        }
      }

      if (this.search.origin) {
        if (process.env.NODE_ENV === 'production') {
          this.$ga.event({
            eventCategory: 'search',
            eventAction: 'select',
            eventLabel: `Origin ${this.search.origin}`
          })
        }
      }

      const context = this

      return context.logos.filter(band => {
        const searched = context.search
        const name = band.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searched.band.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        const genre = (!searched.genre && !band.genre) || (!searched.genre || (band.genre && band.genre.includes(searched.genre)))
        const origin = (!searched.origin && !band.origin) || (!searched.origin || (band.origin && band.origin.includes(searched.origin)))

        return name && origin && genre
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$route.query.q && (this.search.band = this.$route.query.q)
      this.$route.query.origin && (this.search.origin = this.$route.query.origin)
      this.$route.query.genre && (this.search.genre = this.$route.query.genre)

      if (process.env.NODE_ENV === 'production') {
        this.$ga.page(location.pathname)
      }
    })
  }
}
</script>
