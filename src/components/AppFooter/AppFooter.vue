<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <p>©Copyright 2016-{{ year }}</p>
    <p>Tiago Porto</p>
  </footer>
</template>

<style lang="scss" scoped>
@use './AppFooter';
</style>
