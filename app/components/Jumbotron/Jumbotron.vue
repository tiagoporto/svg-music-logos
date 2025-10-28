<script lang="ts" setup>
import { debounce } from 'throttle-debounce'
import { ref, onMounted, onUnmounted } from 'vue'

const jumbotron = ref<HTMLElement | null>(null)

const setBgColor = () => {
  const element = globalThis
  if (element.innerWidth > 768) {
    element.document.body.style.backgroundColor = '#fff'
  }
}

const setJumbotronHeight = () => {
  const element = globalThis

  if (jumbotron.value) {
    if (element.innerWidth > 768) {
      // only if is not mobile and is not in the top
      jumbotron.value.style.height = element.scrollY > 20 ? '100%' : '560px'
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
  <div class="jumbotron-back" data-happo />
  <div ref="jumbotron" class="jumbotron" data-happo-hide />
</template>

<style lang="scss" scoped>
@use './Jumbotron';
</style>
