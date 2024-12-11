export const injectCSSinSVG = ({ svg, css } = {}) => {
  if (!svg || !css) {
    return svg
  }

  const styles = `<style>${css}</style>`
  const extractSVGTagRegex = /(<svg[^>]*>)/
  const svgReplaced = svg.replace(extractSVGTagRegex, `$1\r\n${styles}\r\n`)

  return svgReplaced
}
