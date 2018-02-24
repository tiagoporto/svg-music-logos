<template>
  <div id="svgMusicLogosApp">
    <div class="jumbotron" id="jumbotron"></div>

    <app-header :search="search" :origins="origins" :genres="genres" v-once></app-header>

    <main class="card-container">
      <card v-for="(band, index) in filteredBands" :band="band" v-bind:key="index"></card>
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
  .filter(genre => genre !== undefined)

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
  .filter(origin => origin !== undefined)

const origins = allOrigins
  .filter((item, pos) => allOrigins.indexOf(item) === pos)
  .sort()

const bands = []

data.forEach((band, index) => {
  const getLogo = band.logos

  getLogo.forEach(logo => {
    bands.push({
      name: band.name,
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
      bands,
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
    filteredBands () {
      const context = this
      if (this.search.band) {
        this.$router.replace({
          name: 'search',
          params: {q: this.search.band}
        })
      }

      return context.bands.filter(band => {
        const searched = context.search
        const name = band.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searched.band.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        const genre = (!searched.genre && !band.genre) || (band.genre && band.genre.includes(searched.genre))
        const origin = (!searched.origin && !band.origin) || (band.origin && band.origin.includes(searched.origin))

        return name && origin && genre
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (process.env.NODE_ENV === 'production') {
        this.$ga.page(location.pathname)
      }
    })
  }
}
</script>
