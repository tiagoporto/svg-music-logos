<script setup lang="ts">
import { TITLE } from '../constants/site'

const pageTitle = `${TITLE} | Download`

onMounted(() => {
  // Track download in analytics
  location.href = '/logos/svg-music-logos.zip'

  navigateTo('/')
})
</script>

<template>
  <Head>
    <Title>{{ pageTitle }}</Title>
  </Head>
</template>
