<script setup lang="ts">
const { gtag } = useGtag()

const handleClick = (audioStreaming: 'YT Music' | 'Spotify') => {
  if (process.env.NODE_ENV === 'production') {
    gtag('event', 'svg-music-logos', {
      event_category: 'Listen On',
      event_label: audioStreaming,
    })
  }
}
</script>

<template>
  <v-btn
    color="light-blue-darken-3"
    append-icon="mdi-menu-down"
    size="x-large"
    tile
    class="mb-5"
  >
    Listen On

    <v-menu activator="parent">
      <v-list tile>
        <v-list-item
          href="https://music.youtube.com/playlist?list=PLKtV93YW2_X-Iu_iNpyMG03bWx8YTTAx6&feature=share"
          target="_blank"
          @click="handleClick('YT Music')"
        >
          <v-list-item-title>
            <v-icon icon="mdi-youtube" />
            YT Music</v-list-item-title
          >
        </v-list-item>

        <v-list-item
          href="https://open.spotify.com/playlist/20XHrsLWAJkgBBagZiURM5"
          target="_blank"
          @click="handleClick('Spotify')"
        >
          <v-list-item-title
            ><v-icon icon="mdi-spotify" /> Spotify</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</template>
