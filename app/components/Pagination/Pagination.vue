<script setup lang="ts">
interface PaginationProps {
  totalPages?: number
}

const { totalPages = undefined } = defineProps<PaginationProps>()

const route = useRoute()
const currentPage = computed(() => Number(route.query.page) || 1)

const changePage = (page: number) => {
  navigateTo({ query: { ...route.query, page } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <v-container>
    <v-pagination
      :model-value="currentPage"
      :length="totalPages"
      color="white"
      total-visible="4"
      variant="tonal"
      @update:model-value="changePage"
    ></v-pagination>
  </v-container>
</template>
