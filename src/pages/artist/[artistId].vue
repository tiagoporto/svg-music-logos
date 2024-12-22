<script setup lang="ts">
const { params, query } = useRoute()
const { data } = await useFetch(`/api/artist/${params.artistId}`, { query })
</script>

<template>
  <template v-if="data?.artist">
    <Card
      v-for="logo in data?.artist?.logos"
      :key="logo?.title"
      :title="data.artist.name"
      :title-template="data?.artist?.nameTemplate"
      :link="data?.artist?.link"
      :genres="data?.artist?.genres"
      :origins="data?.artist?.origins"
      :logo="logo"
    />
  </template>

  <template v-else> No results </template>
</template>
