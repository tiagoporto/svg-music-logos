<template>
  <div id="svgMusicLogosApp">
    <div class="jumbotron" id="jumbotron"></div>

    <app-header></app-header>
    <main class="main">
      <card :filteredBands='filteredBands'></card>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppFooter from './components/footer/AppFooter.vue'
  import AppHeader from './components/header/AppHeader.vue'
  import Card from './components/card/Card.vue'
  import data from '../data.json'
  import {deburr, kebabCase, split} from 'lodash'

  const allGenres = data.map(elem => elem.genre)
  const genres = allGenres.filter((item, pos) => allGenres.indexOf(item) === pos).sort()

  const allOrigins = data.map(elem => elem.origin)
  const origins = allOrigins.filter((item, pos) => allOrigins.indexOf(item) === pos).sort()

  const bands = []
  let count = 0

  data.forEach((band, index) => {
    const getLogo = band.logos

    getLogo.forEach(logo => {
      bands[count] = {
        name: band.name,
        link: band.link,
        origin: band.origin,
        genre: band.genre,
        css: band.css,
        logo
      }

      count += 1
    })
  })

  bands.sort((a, b) => {
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

  export default {
    components: {
      AppFooter,
      AppHeader,
      Card
    },
    data () {
      return {
        bands: '',
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

        return bands.filter(band => {
          const searched = context.search
          const name = band.name.toLowerCase().includes(searched.band.toLowerCase())
          const genre = (!searched.genre && !band.genre) || (band.genre && band.genre.includes(searched.genre))
          const origin = (!searched.origin && !band.origin) || (band.origin && band.origin.includes(searched.origin))

          return name && origin && genre
        })
      }
    },
    methods: {
      download (event, data) {
        let svgFileName = data.logo.svg.toLowerCase()
        const cssFileName = data.css
        const sanitizedTitle = kebabCase(deburr(data.logo.title.toLowerCase()))

        if (!svgFileName.includes(sanitizedTitle)) {
          const splitedFilename = split(svgFileName, '.')
          svgFileName = `${splitedFilename[0]}_${sanitizedTitle}.${splitedFilename[1]}`
        }
      }
    }
  }
</script>
