<template>
  <header class="header">
    <div class="header__main">
      <h1>
        <a href="http://tiagoporto.github.io/svg-music-logos" class="header__title">
          <!-- <img id="logo" src="img/logos/logo.svg" alt="{-}" width="250" /> -->
          SVG Music Logos
        </a>
      </h1>

      <div class="github-buttons">
        <a class="github-button" href="https://github.com/tiagoporto"  data-show-count="true" aria-label="Follow @tiagoporto on GitHub">Follow @tiagoporto</a>

        <a class="github-button" href="https://github.com/tiagoporto/svg-music-logos/fork" data-icon="octicon-git-branch" data-show-count="true" aria-label="Fork tiagoporto/svg-music-logos on GitHub">Fork</a>

        <a class="github-button" href="https://github.com/tiagoporto/svg-music-logos/issues" data-icon="octicon-issue-opened" data-show-count="true" aria-label="Issue tiagoporto/svg-music-logos on GitHub">Issue</a>

        <a class="github-button" href="https://github.com/tiagoporto/svg-music-logos" data-icon="octicon-star" data-show-count="true" aria-label="Star tiagoporto/svg-music-logos on GitHub">Star</a>
      </div>

      <p>A collection of bands' and musicians' logos in SVG.</p>
      <p>All brands are trademarks of their respective bands or musicians.</p>
      <p>The Brands and symbols should only be used to represent which artists they refer.</p>

      <input type="search" v-model.trim="search.band" placeholder="Search" class="search" />

      <div class="filter">
        <p>Filters</p>

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
export default {
  name: 'AppHeader',
  props: {
    origins: [Array],
    genres: [Array],
    search: [Object]
  }
}
</script>
