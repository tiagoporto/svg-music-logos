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

        <img :src="'logos/' + band.logo.svg" :class="'logo ' + band.logo.class" />

        <p><button v-on:click="download($event, band)">Download svg</button></p>
      </div>
    </div>
  </div>
</template>

<script>
import svgToInline from 'svg-to-inline/src/js/svg-to-inline.js'

export default {
  props: {
    filteredBands: [Array]
  },
  mounted () {
    svgToInline('.logo')
  },
  updated () {
    svgToInline('.logo')
  }
}
</script>
