import { createSVGPath } from './createSVGPath.js'
export const filterArtists = (data) => {
  const artists = []

  data.forEach(({ logos, id, ...rest }) => {
    const newLogos = logos.map((logo) => {
      const path = createSVGPath({ id, title: logo.title })

      return {
        title: logo.title,
        svg: path,
        ...(logo.inverse !== undefined ? { inverse: logo.inverse } : {}),
      }
    })

    artists.push({
      ...rest,
      logos: newLogos,
    })
  })

  return {
    artists: artists.sort((a, b) => a.name.localeCompare(b.name)),
    count: artists.length,
  }
}
