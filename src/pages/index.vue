<script setup lang="ts">
const router = useRouter()
const { page } = useRoute().query

const currentPage = ref(page || 1)
const query = computed(() => {
  return {
    page: currentPage.value,
  }
})

const { data, status } = useFetch('/api/logos', { query })

const changePage = (page: number) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  router.push({ query: { page } })
  currentPage.value = page
}
</script>

<template>
  <template v-if="status !== 'success'">
    <v-skeleton-loader
      width="100%"
      class="card"
      :elevation="12"
      type="card"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="card"
      :elevation="12"
      type="card"
    ></v-skeleton-loader>
  </template>

  <template v-if="status === 'success'">
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

    <v-pagination
      :model-value="Number(currentPage)"
      :length="data?.pagination.totalPages"
      color="light-blue-darken-3"
      @update:model-value="changePage($event)"
    ></v-pagination>
  </template>
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
