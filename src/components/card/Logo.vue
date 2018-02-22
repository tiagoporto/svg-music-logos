<template>
  <div v-html="html" class="logo"></div>
</template>

<script>
import './Logo.styl'

const mdSVGStore = {}
export default {
  name: 'Logo',
  props: {
    band: [Object]
  },
  data: () => ({
    html: null,
    error: null
  }),
  computed: {
    svgSRC () {
      return this.band.logo.svg
    }
  },
  watch: {
    svgSRC () {
      this.html = null
      this.loadSVG()
    }
  },
  updated () {
    const el = this.$el.getElementsByTagName('svg')[0]

    if (el && this.band.logo.cls) {
      if (el.classList) {
        el.classList.add(this.band.logo.cls)
      } else {
        `${el.className} ${this.band.logo.cls}`
      }
    }
  },
  methods: {
    isSVG (mimetype) {
      return mimetype.indexOf('svg') >= 0
    },
    setHtml () {
      mdSVGStore[this.svgSRC].then(html => {
        this.html = html

      })
    },
    unexpectedError (reject) {
      this.error = `Something bad happened trying to fetch ${this.svgSRC}.`
      reject(this.error)
    },
    loadSVG () {
      if (!Object.prototype.hasOwnProperty.call(mdSVGStore, this.svgSRC)) {
        mdSVGStore[this.svgSRC] = new Promise((resolve, reject) => {
          const request = new window.XMLHttpRequest()
          request.open('GET', `logos/${this.svgSRC}`, true)
          request.onload = () => {
            const mimetype = request.getResponseHeader('content-type')
            if (request.status === 200) {
              if (this.isSVG(mimetype)) {
                resolve(request.response)
                this.setHtml()
              } else {
                this.error = `The file ${this.svgSRC} is not a valid SVG.`
                reject(this.error)
              }
            } else if (request.status >= 400 && request.status < 500) {
              this.error = `The file ${this.svgSRC} do not exists.`
              reject(this.error)
            } else {
              this.unexpectedError(reject)
            }
          }
          request.onerror = () => this.unexpectedError(reject)
          request.onabort = () => this.unexpectedError(reject)
          request.send()
        })
      } else {
        this.setHtml()
      }
    }
  },
  created () {
    this.loadSVG()
  }
}
</script>
