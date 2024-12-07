<script lang="ts" setup>
import type { Logo } from '../../server/db/schema'

interface LogoProps {
  logo: Logo
}

const { logo } = defineProps<LogoProps>()
</script>

<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <svg-to-inline :key="logo.title" loading="loading" :path="logo.svg" lazy>
  </svg-to-inline>
</template>

<style lang="scss">
@use './Logo';
</style>
