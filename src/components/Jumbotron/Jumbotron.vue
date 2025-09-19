<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { debounce } from 'throttle-debounce'

const jumbotron = ref<HTMLElement | null>(null)

const setBgColor = () => {
  const element = window
  if (element.innerWidth > 768) {
    element.document.body.style.backgroundColor = '#fff'
  }
}

const setJumbotronHeight = () => {
  const element = window

  if (jumbotron.value) {
    if (element.innerWidth > 768) {
      // only if is not mobile and is not in the top
      if (element.scrollY > 20) {
        jumbotron.value.style.height = '100%'
      } else {
        jumbotron.value.style.height = '500px'
      }
    } else {
      jumbotron.value.style.height = '200%'
    }
  }
}

const setBgColorDebounced = debounce(8, setBgColor)
const setJumbotronHeightDebounced = debounce(8, setJumbotronHeight)

onMounted(() => {
  setBgColor()
  setJumbotronHeight()
  window.addEventListener('resize', setBgColorDebounced)
  window.addEventListener('scroll', setJumbotronHeightDebounced)
})

onUnmounted(() => {
  window.removeEventListener('resize', setBgColorDebounced)
  window.removeEventListener('scroll', setJumbotronHeightDebounced)
})
</script>

<template>
  <div class="jumbotron-back" data-happo></div>
  <div ref="jumbotron" class="jumbotron" data-happo-hide></div>
</template>

<style lang="scss" scoped>
@use './Jumbotron';
</style>
