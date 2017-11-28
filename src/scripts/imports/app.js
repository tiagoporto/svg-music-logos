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
      const self = this

      return this.bands.filter(function (band) {
        return (
          band.name.toLowerCase().includes(self.search.band.toLowerCase()) &&
          (band.genre && band.genre.toLowerCase().includes(self.search.genre.toLowerCase())) &&
          (band.origin && band.origin.toLowerCase().includes(self.search.origin.toLowerCase()))
        )
      })
    }
  },
  methods: {
    download (event, data) {
      let svgFileName = data.logo.svg.toLowerCase()
      const cssFileName = data.css
      const sanitizedTitle = kebabCase(deburr(data.logo.title.toLowerCase()))
      console.log("svgFileName", svgFileName);

      if (!svgFileName.includes(sanitizedTitle)) {
        const splitedFilename = split(svgFileName, '.')
        svgFileName = `${splitedFilename[0]}_${sanitizedTitle}.${splitedFilename[1]}`
      }
      console.log("svgFileName", svgFileName);
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
