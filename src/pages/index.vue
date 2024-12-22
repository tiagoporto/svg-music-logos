<script setup lang="ts">
const { query } = useRoute()

const { data } = useFetch('/api/logos', { query })
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
