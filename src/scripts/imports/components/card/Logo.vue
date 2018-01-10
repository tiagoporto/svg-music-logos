<template>
  <img :src="'logos/' + band.logo.svg" :class="'logo ' + band.logo.class"/>
</template>

<script>
export default {
  props: {
    band: [Object]
  }
}
</script>
