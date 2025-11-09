<script setup lang="ts">
const route = useRoute()
const query = computed(() => route.query)
const { data, status } = useFetch('/api/logos', {
  query,
  key: '/api/logos',
})

const initialItemsPerPage = computed(() => Number(route.query.itemsPerPage) || 30)

const skeletonsItems = shallowRef(initialItemsPerPage.value)

watchEffect(() => {
  skeletonsItems.value = data.value?.logos && data.value?.logos?.length < initialItemsPerPage.value ? data.value?.logos?.length : initialItemsPerPage.value

  if (data.value === undefined && status.value === 'success') {
    navigateTo({
      name: 'index',
      query: { ...route.query, origin: undefined, genre: undefined },
    })
  }
})
</script>

<template>
  <template v-if="status !== 'success'">
    <v-skeleton-loader
      v-for="(i, index) in skeletonsItems"
      :key="index"
      class="skeleton"
      :elevation="12"
      type="image, article, heading"
    />
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
  </template>
  <Pagination :total-pages="data?.pagination.totalPages" />
</template>

<style lang="scss" scoped>
/* loading card */
.skeleton {
  min-height: auto;
  flex-basis: 100%;

  @media only screen and (width >= 550px) {
    flex-basis: calc((100% - 20px) / 2);
  }

  @media only screen and (width >= 850px) {
    flex-basis: calc((100% - 40px) / 3);
  }
}
</style>
