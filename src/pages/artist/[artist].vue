<script setup lang="ts">
const { params } = useRoute()
const { data } = await useFetch(`/api/artist/${params.artist}`)
</script>

<template>
  <div>
    <NuxtLink to="/"> Back </NuxtLink>

    <div>Artist</div>

    {{ data }}
  </div>
</template>
