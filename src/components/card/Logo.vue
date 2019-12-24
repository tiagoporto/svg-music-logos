<template>
  <svg-to-inline
    class="logo"
    :path="svgSRC"
    :class-name="svgCls"
    :lazy="true"
  ></svg-to-inline>
</template>

<script>
import 'svg-to-inline'
import './Logo.styl'

export default {
  name: 'Logo',
  props: {
    band: [Object]
  },
  computed: {
    CSSPath() {
      const css = this.band.css

      return css && `logos/${css.split('.')[0]}/${css}`
    },
    svgCls() {
      return this.band.logo.cls
    },
    svgSRC() {
      const svg = this.band.logo.svg
      return `logos/${svg.split('.')[0].split('_')[0]}/${svg}`
    }
  }
}
</script>
