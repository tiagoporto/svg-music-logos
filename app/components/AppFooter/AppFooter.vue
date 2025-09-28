<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <p>© 2016-{{ year }} Tiago Porto</p>
  </footer>
</template>

<style lang="scss" scoped>
@use './AppFooter';
</style>
