<template>
  <div class="card">
    <logo :band='band'></logo>

    <div class="card__content">
      <h2 class="card__title">
        <a class="card__title" :href="`http://${band.link}`" :title="`${band.name} website`">{{band.name}}</a>
      </h2>

      <p v-if="band.genre">Genre: {{band.genre}}</p>

      <p>Origin: {{band.origin}}</p>

      <p>Reference: {{band.logo.title}}</p>
    </div>

    <div class="card__footer">
      <button v-on:click="download($event, band)" class="card__button">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.92 476.92" width="20px" fill="#f00">
  <path d="M457.464 392.237H295.021l-21.939 21.939c-9.248 9.248-21.543 14.34-34.622 14.34-13.078 0-25.374-5.092-34.621-14.34l-21.94-21.939H19.461c-7.797 0-14.113 6.315-14.113 14.112v56.457c0 7.797 6.316 14.113 14.113 14.113h437.997c7.797 0 14.113-6.322 14.113-14.113V406.35c.006-7.797-6.31-14.113-14.107-14.113z"/>
  <path d="M207.872 392.237l8.953 8.953c5.973 5.974 13.807 8.96 21.64 8.96 7.834 0 15.661-2.986 21.635-8.96l8.953-8.953 143.164-143.165c11.953-11.953 7.939-21.641-8.959-21.641h-58.072V12.24c0-6.763-5.484-12.24-12.24-12.24H143.973c-6.757 0-12.24 5.478-12.24 12.24v215.191H73.66c-16.897 0-20.912 9.688-8.959 21.641l143.171 143.165z"/>
</svg> -->
Download SVG</button>
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
