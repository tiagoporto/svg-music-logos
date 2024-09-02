<script lang="ts" setup>
import 'normalize.css/normalize.css'

const title = 'SVG Music Logos'
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

      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <Link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap"
        rel="stylesheet"
      />
    </Head>

    <NuxtLoadingIndicator />
    <NuxtPage />

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.10/webcomponents-bundle.js"></script> -->
  </NuxtLayout>
</template>

<style>
/*!
*
* Box model reset
* http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
*
*/
html {
  box-sizing: border-box;
  font-family:
    'Lato',
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    sans-serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>
