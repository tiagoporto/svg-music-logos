import { createSVGPath } from './createSVGPath.js'
export const filterArtists = (data) => {
  if (!data) {
    return { artists: [], count: 0 }
  }

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
      id,
      ...rest,
      logos: newLogos,
    })
  })

  return {
    artists: artists.sort((a, b) => a.name.localeCompare(b.name)),
    count: artists.length,
  }
}
