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
import Logo from './Logo.vue'
import FileSaver from 'file-saver'

export default {
  components: {
    Logo
  },
  props: {
    filteredBands: [Array]
  },
  methods: {
    download (event, band) {
      const svg = event.target.parentElement.previousElementSibling.innerHTML

      const save = (content, file = band.logo.svg) => {
        content = new Blob([content], {type: 'text/plain'})
        FileSaver.saveAs(content, file)
      }

      if (band.css) {
        const request = new XMLHttpRequest()
        request.open('GET', `css/logo/${band.css}`, true)

        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 400) {
              const cssResponse = `<style>\r\n${request.responseText}\r</style>`
              const content = svg.replace(/(<svg[\w='"\s:\/.-]+>)/, `$1\r\n${cssResponse}`)

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

      // typeof ga === 'function' && ga('send', 'event', 'download', 'click', fileName)
    }
  }
}
</script>
