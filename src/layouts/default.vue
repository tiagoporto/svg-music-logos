<template>
  <AppHeader v-once></AppHeader>

  <main class="card-container">
    <slot />
  </main>

  <BackTop />

  <AppFooter />
</template>

<style lang="scss" scoped>
@use './default';
</style>
