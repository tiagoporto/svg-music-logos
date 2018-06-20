<template>
  <header class="header">
    <github-corner repo="tiagoporto/svg-music-logos"></github-corner>

    <div class="header__main">
      <h1 class="header__title">
        <a href="http://tiagoporto.github.io/svg-music-logos" class="header__link-title">
          <!-- <img id="logo" src="img/logos/logo.svg" alt="{-}" width="250" /> -->
          SVG Music Logos
        </a>
        <span class="header__subtitle">{{artists.length}} artists • {{logos.length}} logos</span>
      </h1>


      <p>A collection of bands' and musicians' logos in SVG.</p>
      <p>All brands are trademarks of their respective bands or musicians.</p>
      <p>The brands and symbols should only be used to represent which artists they refer.</p>

      <p><a href="https://github.com/tiagoporto/svg-music-logos/issues" class="link">Request a new logo or report a problem.</a></p>

      <input type="search" v-model.trim="search.band" placeholder="Search" class="search" autofocus/>

      <div class="filter">
        <select v-model="search.origin" class="select">
            <option value="">All Origins</option>
            <option v-for="origin in origins" :value="origin">{{origin}}</option>
        </select>

        <select v-model="search.genre" class="select">
            <option value="">All Genres</option>
            <option v-for="genre in genres" :value="genre">{{genre}}</option>
        </select>
      </div>
    </div>
  </header>
</template>

<script>
import './AppHeader.styl'
import './Jumbotron.styl'
import _ from 'lodash'
import GithubCorner from '../github-corner/GithubCorner.vue'

const setJumbotronHeight = () => {
  if (window.innerWidth > 768) {
    if (window.scrollY > 20) {
      document.getElementById('jumbotron').style.height = '100%'
    } else {
      document.getElementById('jumbotron').style.height = '400px'
    }
  } else {
    document.getElementById('jumbotron').style.height = '100%'
  }
}

window.addEventListener('scroll', _.debounce(setJumbotronHeight, 20))

export default {
  name: 'AppHeader',
  components: {
    GithubCorner
  },
  props: {
    artists: [Array],
    origins: [Array],
    genres: [Array],
    search: [Object],
    logos: [Array]
  }
}
</script>
