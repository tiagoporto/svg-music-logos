<template>
  <div id="svgMusicLogosApp">
    <div class="jumbotron" id="jumbotron"></div>

    <app-header :search="search" :logos="logos" :origins="origins" :genres="genres" v-once></app-header>

    <main class="card-container">
      <card v-for="(band, index) in filteredLogos" :band="band" v-bind:key="index"></card>
    </main>

    <back-top></back-top>

    <app-footer v-once></app-footer>
  </div>
</template>

<script>
import AppFooter from './components/footer/AppFooter.vue'
import AppHeader from './components/header/AppHeader.vue'
import BackTop from './components/back-top/BackTop.vue'
import Card from './components/card/Card.vue'
import data from './data.json'

data.sort((a, b) => {
  const nameA = a.name.toLowerCase()
  const nameB = b.name.toLowerCase()

  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0
})

const allGenres = data
  .map(elem => {
    if (process.env.NODE_ENV !== 'production') {
      elem.genre || console.warn(`${elem.name} is missing the genre.`)
    }

    return elem.genre
  })
  .join()
  .split(',')
  .filter(genre => genre)

const genres = allGenres
  .filter((item, pos) => allGenres.indexOf(item) === pos)
  .sort()

const allOrigins = data
  .map(elem => {
    if (process.env.NODE_ENV !== 'production') {
      elem.origin || console.warn(`${elem.name} is missing the origin.`)
    }

    return elem.origin
  })
  .join()
  .split(',')
  .filter(origin => origin !== undefined)

const origins = allOrigins
  .filter((item, pos) => allOrigins.indexOf(item) === pos)
  .sort()

const logos = []

data.forEach((band, index) => {
  const getLogo = band.logos

  getLogo.forEach(logo => {
    logos.push({
      name: band.name,
      nameTemplate: band.nameTemplate,
      link: band.link,
      origin: band.origin,
      genre: band.genre,
      css: band.css,
      logo
    })
  })
})

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

      this.$router.replace({
        name: 'search',
        query
      })

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
