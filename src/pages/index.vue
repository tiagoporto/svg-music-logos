<script setup lang="ts">
const router = useRouter()
const { page } = useRoute().query

const currentPage = ref(page || 1)
const query = computed(() => {
  return {
    page: currentPage.value,
  }
})

const { data } = useFetch('/api/logos', { query })

const changePage = (page: number) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  router.push({ query: { page } })
  currentPage.value = page
}
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

  <v-pagination
    :model-value="Number(currentPage)"
    :length="data?.pagination.totalPages"
    color="light-blue-darken-3"
    total-visible="5"
    @update:model-value="changePage($event)"
  ></v-pagination>
</template>
