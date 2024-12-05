<script setup lang="ts">
const { data } = useFetch('/api/logos')
</script>

<template>
  <Card
    v-for="logo in data?.logos"
    :key="logo.name"
    :title="logo.name"
    :title-template="logo.nameTemplate"
    :link="logo.link"
    :genres="logo.genres"
    :origins="logo.origins"
    :logo="logo.logo"
  />
</template>
