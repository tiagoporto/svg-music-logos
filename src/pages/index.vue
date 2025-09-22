<script setup lang="ts">
const { page } = useRoute().query

const currentPage = ref(page || 1)
const query = computed(() => {
  return {
    page: currentPage.value,
  }
})

const { data } = useFetch('/api/logos', { query })
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

<style lang="scss" scoped>
.card {
  flex-basis: 100%;

  @media only screen and (width >= 550px) {
    flex-basis: calc((100% - 40px) / 2);
  }

  @media only screen and (width >= 800px) {
    flex-basis: calc((100% - 40px) / 3);
  }
}
</style>
