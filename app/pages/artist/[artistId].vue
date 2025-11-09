<script setup lang="ts">
import { TITLE, URL } from '../../constants/site'

const route = useRoute()
const query = computed(() => route.query)
const { data, status } = await useFetch(
  `/api/artist/${route.params.artistId}`,
  {
    query,
    key: `/api/artist/${route.params.artistId}`,
  },
)

const pageTitle = `${TITLE} | ${data.value?.artist.name} Logos`
const initialItemsPerPage = computed(() => Number(route.query.itemsPerPage) || 30)

const skeletonsItems = shallowRef(initialItemsPerPage.value)

watchEffect(() => {
  skeletonsItems.value = data.value?.artist.logos && data.value?.artist.logos?.length < initialItemsPerPage.value ? data.value?.artist.logos?.length : initialItemsPerPage.value

  if (data.value === undefined) {
    navigateTo({
      name: 'index',
      query: { ...route.query },
    })
  }
})
</script>

<template>
  <Head>
    <Title>{{ pageTitle }}</Title>

    <Meta property="og:title" :content="pageTitle" />
    <Meta
      property="og:url"
      :content="`${URL}/artist/${route.params.artistId}`"
    />
    <Meta
      property="og:image"
      :content="`${URL}/logos/${route.params.artistId}/og.png`"
    />

    <Meta name="twitter:title" :content="pageTitle" />

    <Meta
      name="twitter:image"
      :content="`${URL}/logos/${route.params.artistId}/og.png`"
    />
  </Head>

  <template v-if="status !== 'success'">
    <v-skeleton-loader
      v-for="(i, index) in skeletonsItems"
      :key="index"
      class="skeleton"
      :elevation="12"
      type="image, article, heading"
    />
  </template>

  <template v-if="status === 'success' && data?.artist?.logos">
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

    <Pagination :total-pages="data?.pagination.totalPages" />
  </template>
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
