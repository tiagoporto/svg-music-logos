<script lang="ts" setup>
import { TITLE, DESCRIPTION, URL } from './constants/site'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <Head>
    <Title>{{ TITLE }}</Title>
    <Meta name="description" :content="DESCRIPTION" />
    <Link rel="author" href="/humans.txt" />
    <Link rel="manifest" href="/site.webmanifest" />

    <Meta property="og:title" :content="TITLE" />
    <Meta property="og:description" :content="DESCRIPTION" />
    <Meta property="og:type" content="website" />
    <Meta property="og:url" :content="URL" />
    <Meta property="og:logo" content="/apple-touch-icon.png" />
    <Meta
      v-if="$route.params.artistId"
      property="og:image"
      :content="`/logos/${$route.params.artistId}/og.png`"
    />
    <Meta
      v-else
      property="og:image"
      content="https://socialify.git.ci/tiagoporto/svg-music-logos/png?description=1&language=1&owner=1&pattern=Solid"
    />
    <Meta
      property="og:image:alt"
      content="SVG Music logos headphone logo plus vue logo"
    />

    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="TITLE" />
    <Meta name="twitter:description" :content="DESCRIPTION" />
    <Meta
      v-if="$route.params.artistId"
      name="twitter:image"
      :content="`/logos/${$route.params.artistId}/og.png`"
    />
    <Meta
      v-else
      name="twitter:image"
      content="https://socialify.git.ci/tiagoporto/svg-music-logos/png?description=1&language=1&owner=1&pattern=Solid"
    />

    <Link rel="icon" href="/favicon.ico" sizes="48x48" />

    <Link rel="icon" href="/favicon.png" type="image/png" />

    <Link rel="icon" href="/favicon.svg" type="image/svg+xml" />

    <Link rel="mask-icon" href="/safari-mask-icon.svg" color="#28a7d6" />

    <Meta name="theme-color" content="#28a7d6" />
    <Meta name="mobile-web-app-capable" content="yes" />

    <Meta name="apple-mobile-web-app-capable" content="yes" />
    <Meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
    <Meta name="apple-mobile-web-app-title" content="SVG Music Logos" />
    <Link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

    <Meta name="application-name" :content="TITLE" />
    <Meta name="msapplication-TileColor" content="#28a7d6" />
    <Meta
      name="msapplication-TileImage"
      content="/img/touch/mstile-150x150.png"
    />

    <Meta name="msapplication-config" content="/browserconfig.xml" />
  </Head>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
@use './global';
</style>
