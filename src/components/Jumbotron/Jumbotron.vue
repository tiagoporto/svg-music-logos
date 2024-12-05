<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

import { debounce } from 'throttle-debounce'

const jumbotron = ref<HTMLElement | null>(null)

const setJumbotronHeight = () => {
  const element = window

  if (jumbotron.value) {
    // only if is not mobile and is not in the top
    if (element.innerWidth > 768) {
      if (element.scrollY > 20) {
        jumbotron.value.style.height = '100%'
      } else {
        jumbotron.value.style.height = '450px'
      }
    } else {
      jumbotron.value.style.height = '200%'
    }
  }
}

const setJumbotronHeightDebounced = debounce(8, setJumbotronHeight)

onMounted(() => {
  setJumbotronHeight()
  window.addEventListener('scroll', setJumbotronHeightDebounced)
  // window.addEventListener('touchmove', setJumbotronHeightDebounced)
})

onUnmounted(() => {
  window.removeEventListener('scroll', setJumbotronHeightDebounced)
  // window.removeEventListener('touchmove', setJumbotronHeightDebounced)
})
</script>

<template>
  <div ref="jumbotron" class="jumbotron"></div>
</template>

<style lang="scss" scoped>
@use './Jumbotron';
</style>
