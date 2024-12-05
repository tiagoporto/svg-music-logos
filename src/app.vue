<script lang="ts" setup>
import 'normalize.css/normalize.css'
import './svg-music-logos.styl'

const title =
  process.env.NODE_ENV === 'production'
    ? 'SVG Music Logos'
    : 'SVG Music Logos Testing'
const description = `A collection of bands' and musicians' logos in SVG.`
useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="description" />
      <Meta name="robots" content="index" />
      <Link rel="author" href="humans.txt" />
      <Link rel="manifest" href="site.webmanifest" />
      <Link
        rel="canonical"
        href="https://tiagoporto.github.io/svg-music-logos/"
      />

      <!-- Add to homescreen for Chrome on Android -->
      <Meta name="theme-color" content="#2BB5E5" />
      <Meta name="mobile-web-app-capable" content="yes" />
      <Link
        rel="icon"
        sizes="192x192"
        href="img/touch/chrome-touch-icon-192x192.png"
      />

      <!-- Add to homescreen for Safari on iOS -->
      <Meta name="apple-mobile-web-app-capable" content="yes" />
      <Meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <Meta name="apple-mobile-web-app-title" content="SVG Music Logos" />
      <Link rel="apple-touch-icon" href="img/touch/apple-touch-icon.png" />

      <Meta property="og:type" content="website" />
      <Meta
        property="og:url"
        content="http://tiagoporto.github.io/svg-music-logos"
      />
      <Meta property="og:title" content="Music Logos" />
      <!-- <Meta property="og:image" content="https://example.com/image.jpg"> -->
      <Meta
        property="og:description"
        content="A collection of bands&#39; and musicians&#39; logos in SVG."
      />
      <Meta property="og:site_name" :content="title" />
      <Meta property="og:locale" content="en" />

      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:creator" content="@_tiagoporto" />
      <Meta
        name="twitter:url"
        content="http://tiagoporto.github.io/svg-music-logos"
      />
      <Meta name="twitter:title" :content="title" />
      <Meta name="twitter:description" :content="description" />
      <!-- <Meta name="twitter:image" content="https://example.com/image.jpg"> -->
    </Head>

    <NuxtLoadingIndicator />
    <NuxtPage />

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.10/webcomponents-bundle.js"></script> -->
  </NuxtLayout>
</template>

<style lang="scss">
@use './global';
</style>
