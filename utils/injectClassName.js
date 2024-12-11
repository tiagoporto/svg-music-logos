export const injectClassName = (svg, className) => {
  if (!svg || !className) {
    return svg
  }
  const searchClassAttributeRegex = /<svg[^>]+class="(.*?)"/
  const extractSVGTagRegex = /(<svg[^>]*)/
  const extractSVGUntilClassAttributeRegex = /(<svg[^>]*) class="(.*?)"/

  // Extract SVG classes
  const svgClassName = svg.match(searchClassAttributeRegex)?.[1]
  const newClassName = svgClassName ? `${svgClassName} ${className}` : className
  const classNameArray = newClassName.split(' ')
  const uniqueClassName = [...new Set(classNameArray)].filter(Boolean).join(' ')

  // If SVG doesn't already have a class attribute add it
  if (!svg.match(searchClassAttributeRegex)) {
    return svg.replace(extractSVGTagRegex, `$1 class="${uniqueClassName}"`)
  }

  return svg.replace(
    extractSVGUntilClassAttributeRegex,
    `$1 class="${uniqueClassName}"`,
  )
}
