<script setup lang="ts">
const scrollTop = () => {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<template>
  <button title="Back to top" class="button" @click="scrollTop">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="currentColor"
    >
      <path
        d="M25 0C11.2 0 .1 11.2.1 24.9s11.1 25 24.9 25S49.9 38.7 49.9 25 38.8 0 25 0zm16.2 34.1c-1.1 1.1-2.9 1.1-4.1 0L25 21.9 12.9 34.1c-1.1 1.1-2.9 1.1-4.1 0-1.1-1.1-1.1-2.9 0-4.1L23 15.8c.5-.5 1.3-.8 2-.8.8 0 1.5.3 2 .8L41.2 30c1.1 1.1 1.1 3 0 4.1z"
      />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@use './BackTop';
</style>
