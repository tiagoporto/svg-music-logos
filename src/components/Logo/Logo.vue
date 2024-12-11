<script lang="ts" setup>
import type { Logo } from '../../server/db/schema'

interface LogoProps {
  artist: string
  logo: Logo
}

const { logo, artist } = defineProps<LogoProps>()
</script>

<template>
  <div class="logo">
    <img
      v-if="logo.svg"
      :src="logo.svg"
      :alt="`${logo.title} logo from ${artist}`"
    />
  </div>
</template>

<style lang="scss">
@use './Logo';
</style>
