<script setup>
const { params } = useRoute()
const { data, pending, error, refresh } = await useFetch(
  `/api/artist/${params.artist}`,
)
</script>

<template>
  <NuxtLink to="/"> Back </NuxtLink>

  <div>Artist</div>
  {{ data }}
</template>
