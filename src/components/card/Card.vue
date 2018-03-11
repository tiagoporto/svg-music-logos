<template>
  <div class="card" v-bind:class="{'card--inverse': band.logo.inverse}">
    <logo :band='band'></logo>

    <div class="card__content">
      <h2 class="card__title">
        <a class="card__title" :href="`http://${band.link}`" :title="`${band.name} website`">{{band.name}}</a>
      </h2>

      <p v-if="band.genre">Genre: {{band.genre}}</p>

      <p>Origin: <flag :iso="getFlagIso(band.origin)" v-bind:squared="false" /> {{band.origin}}</p>

      <p>Reference: {{band.logo.title}}</p>
    </div>

    <div class="card__footer">
      <button v-on:click="download($event, band)" class="card__button">Download SVG</button>
    </div>
  </div>
</template>

<script>
import './Card.styl'
import {deburr, kebabCase, split} from 'lodash'
import FileSaver from 'file-saver'
import FlagIso from './FlagIso.json'
import Logo from './Logo.vue'

export default {
  name: 'Card',
  components: {
    Logo
  },
  props: {
    band: [Object]
  },
  methods: {
    download (event, band) {
      let svgFileName = band.logo.svg.toLowerCase()
      const svg = event.target.parentElement.parentElement.firstChild.innerHTML
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
        request.open('GET', `logos/${band.css}`, true)

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
    },
    getFlagIso (country) {
      return FlagIso[country]
    }
  }
}
</script>
