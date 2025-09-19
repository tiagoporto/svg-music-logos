<script setup lang="ts">
import { TITLE, URL } from '../../constants/site'

const { params, query } = useRoute()
const { data } = await useFetch(`/api/artist/${params.artistId}`, { query })

const pageTitle = `${TITLE} | ${data.value?.artist.name} Logos`
</script>

<template>
  <Head>
    <Title>{{ pageTitle }}</Title>

    <Meta property="og:title" :content="pageTitle" />
    <Meta property="og:url" :content="`${URL}/artist/${params.artistId}`" />
    <Meta
      property="og:image"
      :content="`${URL}/logos/${params.artistId}/og.png`"
    />

    <Meta name="twitter:title" :content="pageTitle" />

    <Meta
      name="twitter:image"
      :content="`${URL}/logos/${params.artistId}/og.png`"
    />
  </Head>

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
