<template>
  <main class="card-container">
    <slot />
  </main>

  <AppFooter v-once />
</template>

<style lang="scss" scoped>
@use './default';
</style>
