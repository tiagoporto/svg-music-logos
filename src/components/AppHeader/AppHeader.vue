<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import './AppHeader.styl'
import './Jumbotron.styl'
import { debounce } from 'lodash'

const jumbotron = ref(null)

const { data: artists } = useFetch('/api/artists')
const { data: logos } = useFetch('/api/logos')

const setJumbotronHeight = () => {
  const element = window

  if (element.innerWidth > 768) {
    if (element.scrollY > 20) {
      jumbotron.value.style.height = '100%'
    } else {
      jumbotron.value.style.height = '450px'
    }
  } else {
    jumbotron.value.style.height = '100%'
  }
}

const setJumbotronHeightDebounced = debounce(setJumbotronHeight, 20)

onMounted(() => {
  window.addEventListener('scroll', setJumbotronHeightDebounced)
})

onUnmounted(() => {
  window.removeEventListener('scroll', setJumbotronHeightDebounced)
})
</script>

<template>
  <div class="jumbotron" ref="jumbotron"></div>

  <header class="header">
    <GithubCorner repo="tiagoporto/svg-music-logos"></GithubCorner>

    <div class="header__main">
      <h1 class="header__title">
        <a
          href="http://tiagoporto.github.io/svg-music-logos"
          class="header__link-title"
        >
          <img src="./logo.svg" alt="SVG Music Logos" width="300" />
        </a>
        <span class="header__subtitle"
          >{{ artists.length }} artists • {{ logos.length }} logos</span
        >
      </h1>

      <p>A collection of bands' and musicians' logos in SVG.</p>
      <p>All brands are trademarks of their respective bands or musicians.</p>
      <p>
        The brands and symbols should only be used to represent which artists
        they refer.
      </p>

      <p>
        <a
          href="https://github.com/tiagoporto/svg-music-logos/issues"
          class="link"
          >Request a new logo or report an issue.</a
        >
      </p>

      <!--
      <input
        v-model.trim="search.band"
        type="search"
        placeholder="Search"
        class="search"
        aria-label="Search by names"
        autofocus
      />

      <div class="filter">
        <select v-model="search.origin" class="select" aria-label="Origins">
          <option value>All Origins</option>
          <option v-for="origin in origins" :key="origin" :value="origin">
            {{ origin }}
          </option>
        </select>

        <select v-model="search.genre" class="select" aria-label="Genres">
          <option value>All Genres</option>
          <option v-for="genre in genres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>-->
    </div>
  </header>
</template>
