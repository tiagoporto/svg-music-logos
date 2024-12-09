<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

import { debounce } from 'throttle-debounce'

const jumbotron = ref<HTMLElement | null>(null)

const setJumbotronHeight = () => {
  const element = window

  if (jumbotron.value) {
    if (element.innerWidth > 768) {
      // only if is not mobile and is not in the top
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
  const element = window
  if (element.innerWidth > 768) {
    element.document.body.style.backgroundColor = '#fff'
  }
  setJumbotronHeight()
  window.addEventListener('scroll', setJumbotronHeightDebounced)
})

onUnmounted(() => {
  window.removeEventListener('scroll', setJumbotronHeightDebounced)
})
</script>

<template>
  <div ref="jumbotron" class="jumbotron"></div>
</template>

<style lang="scss" scoped>
@use './Jumbotron';
</style>
