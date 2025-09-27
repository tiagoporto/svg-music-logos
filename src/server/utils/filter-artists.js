import { createSVGPath } from './create-svg-path.js'
export const filterArtists = (data) => {
  if (!data) {
    return { artists: [], count: 0 }
  }

  const artists = []

  for (const { logos, id, ...rest } of data) {
    const newLogos = logos.map((logo) => {
      const path = createSVGPath({ id, title: logo.title })

      return {
        title: logo.title,
        svg: path,
        ...(logo.inverse === undefined ? {} : { inverse: logo.inverse }),
      }
    })

    artists.push({
      id,
      ...rest,
      logos: newLogos,
    })
  }

  return {
    artists: artists.sort((a, b) => a.name.localeCompare(b.name)),
    count: artists.length,
  }
}
