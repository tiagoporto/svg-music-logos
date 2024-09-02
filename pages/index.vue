<script setup lang="ts">
const { data, pending, error, refresh } = useFetch('/api/logos')
</script>

<template>
  <main class="card-container">
    <Card
      v-for="logo in data.logos"
      :key="logo.id"
      :title="logo.name"
      :link="logo.link"
      :genres="logo.genres"
      :origins="logo.origins"
      :logo="logo.logo"
    />
  </main>
</template>
