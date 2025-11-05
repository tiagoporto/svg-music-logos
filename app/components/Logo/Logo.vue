<script lang="ts" setup>
import type { Logo } from '#shared/db/schema'

interface LogoProps {
  artist: string
  logo: Logo
}

const { logo, artist } = defineProps<LogoProps>()
</script>

<template>
  <div class="logo">
    <NuxtImg
      v-if="logo.svg"
      :src="logo.svg"
      :alt="`${logo.title} logo from ${artist}`"
    />
  </div>
</template>

<style lang="scss">
@use './Logo';
</style>
