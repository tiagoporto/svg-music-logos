<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch('/api/artists')
</script>

<template>
  <div>{{ data.artists }}</div>
</template>
