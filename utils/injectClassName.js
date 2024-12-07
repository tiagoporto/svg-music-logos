export const injectClassName = (svg, className) => {
  const searchClassAttributeRegex = /class="(.*?)"/
  const extractSVGTagRegex = /(<svg[^>]+)/
  const extractSVGUntilClassAttributeRegex = /(<svg[^>]+) class="(.*?)"/

  // Extract SVG classes
  const svgClassName = svg.match(searchClassAttributeRegex)?.[1]
  const newClassName = svgClassName ? `${svgClassName} ${className}` : className
  const uniqueClassName = newClassName
    .split(' ')
    .filter((className) => className)
    .filter((className, index, self) => self.indexOf(className) === index)
    .join(' ')

  // If SVG doesn't already have a class attribute add it
  if (!svg.match(searchClassAttributeRegex)) {
    return svg.replace(extractSVGTagRegex, `$1 class="${uniqueClassName}"`)
  }

  return svg.replace(
    extractSVGUntilClassAttributeRegex,
    `$1 class="${uniqueClassName}"`,
  )
}
