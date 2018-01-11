<template>
  <div class="card-container">
    <div v-for="band in filteredBands" class="card-container__cols">
      <div class="card">
        <h2>
          <a class="card__link-title" :href="'http://' + band.link" :title="band.name + ' website'">{{band.name}}</a>
        </h2>

        <p v-if="band.genre">Genre: {{band.genre}}</p>

        <p>Origin: {{band.origin}}</p>

        <p>{{band.logo.title}}</p>

        <logo :band='band'></logo>

        <p><button v-on:click="download($event, band)">Download svg</button></p>
      </div>
    </div>
  </div>
</template>

<script>
import {deburr, kebabCase, split} from 'lodash'
import FileSaver from 'file-saver'
import Logo from './Logo.vue'

export default {
  name: 'Card',
  components: {
    Logo
  },
  props: {
    filteredBands: [Array]
  },
  methods: {
    download (event, band) {
      let svgFileName = band.logo.svg.toLowerCase()
      const svg = event.target.parentElement.previousElementSibling.innerHTML
      const sanitizedTitle = kebabCase(deburr(band.logo.title.toLowerCase()))

      if (!svgFileName.includes(sanitizedTitle)) {
        const splitedFilename = split(svgFileName, '.')
        svgFileName = `${splitedFilename[0]}_${sanitizedTitle}.${splitedFilename[1]}`
      }

      const save = (content, filename = band.logo.svg) => {
        content = new Blob([content], {type: 'text/plain'})
        FileSaver.saveAs(content, filename)

        if (process.env.NODE_ENV === 'production') {
          this.$ga.event({
            eventCategory: 'download',
            eventAction: 'click',
            eventLabel: svgFileName
          })
        }
      }

      if (band.css) {
        const request = new XMLHttpRequest()
        request.open('GET', `css/logo/${band.css}`, true)

        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 400) {
              const cssResponse = `<style>\r\n${request.responseText}\r</style>`
              const content = svg.replace(/(<svg[\w='"\s:/.-]+>)/, `$1\r\n${cssResponse}`)

              save(content)
            } else {
              // Error :(
            }
          }
        }

        request.send()
      } else {
        save(svg)
      }
    }
  }
}
</script>
