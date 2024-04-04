<script setup>
const { data, pending, error, refresh } = await useFetch('/api/artists')
</script>

<template>
  <NuxtLink to="/artist/metallica"> Metallica </NuxtLink>
  <div>{{ data.artists }}</div>
</template>
