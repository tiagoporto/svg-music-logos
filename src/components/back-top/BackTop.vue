<template>
  <button class="button--back-top" @click="scrollTop">Top</button>
</template>

<script>
import './BackTop.styl'

export default {
  name: 'BackTop',
  methods: {
    scrollTop: () => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  }
}
</script>
