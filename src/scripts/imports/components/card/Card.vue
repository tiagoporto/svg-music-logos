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

export default {
  components: {
    Logo
  },
  props: {
    filteredBands: [Array]
  }
}
</script>
