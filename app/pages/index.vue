<script setup lang="ts">
const route = useRoute()
const query = computed(() => route.query)
const { data, status } = useFetch('/api/logos', {
  query,
  key: '/api/logos',
})

watchEffect(() => {
  if (data.value === undefined && status.value === 'success') {
    navigateTo({
      name: 'index',
      query: { ...route.query, origin: undefined, genre: undefined },
    })
  }
})
</script>

<template>
  <Card
    v-for="logo in data?.logos"
    :key="`${logo.name}-${logo.logo.title}`"
    :title="logo.name"
    :title-template="logo.nameTemplate"
    :link="logo.link"
    :genres="logo.genres"
    :origins="logo.origins"
    :logo="logo.logo"
  />

  <Pagination :total-pages="data?.pagination.totalPages" />
</template>
