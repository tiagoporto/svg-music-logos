import data from '../data.json'
import Vue from 'vue'
import { deburr, kebabCase, split } from 'lodash'

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

const app = new Vue({
  el: '#svgMusicLogosApp',
  data: {
    bands,
    genres,
    origins,
    search: {
      band: '',
      genre: '',
      origin: ''
    }
  },
  computed: {
    filteredBands () {
      const context = this

      return context.bands.filter(band => {
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
})

window.onscroll = () => {
  if (window.scrollY > 0) {
    document.getElementById('jumbotron').style.height = '100%'
  } else {
    document.getElementById('jumbotron').style.height = '400px'
  }
}

export default app
