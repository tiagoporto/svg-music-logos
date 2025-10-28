export const injectCSSinSVG = ({
  svg,
  css,
}: { svg?: string, css?: string } = {}) => {
  if (!svg || !css) {
    return svg
  }

  const styles = `<style>${css}</style>`
  const extractSVGTagRegex = /(<svg[^>]*>)/
  const svgReplaced = svg.replace(extractSVGTagRegex, `$1\r\n${styles}\r\n`)

  return svgReplaced
}
