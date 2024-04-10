<script setup lang="ts">
import './AppFooter.styl'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <p>©Copyright 2016-{{ year }}</p>
    <p>Tiago Porto</p>
  </footer>
</template>
