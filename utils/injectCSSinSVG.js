export const injectCSSinSVG = ({ svg, css }) => {
  const styles = `<style>${css}</style>`
  const extractSVGTagRegex = /(<svg[^>]+>)/
  const svgReplaced = svg.replace(extractSVGTagRegex, `$1\r\n${styles}`)

  return svgReplaced
}
