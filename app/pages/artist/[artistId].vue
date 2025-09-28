<script setup lang="ts">
import { TITLE, URL } from '../../constants/site'

const route = useRoute()
const query = computed(() => route.query)
const { data } = await useFetch(`/api/artist/${route.params.artistId}`, {
  query,
  key: `/api/artist/${route.params.artistId}`,
})

const pageTitle = `${TITLE} | ${data.value?.artist.name} Logos`

watchEffect(() => {
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

  <template v-if="data?.artist?.logos">
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
