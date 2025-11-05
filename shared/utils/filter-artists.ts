import type { Artist } from '#shared/schema.ts'

import { createSVGPath } from './create-svg-path.ts'

export const filterArtists = (data: Artist[]) => {
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
        ...(logo.backgroundColor === undefined
          ? {}
          : { backgroundColor: logo.backgroundColor }),
      }
    })

    artists.push({
      id,
      ...rest,
      logos: newLogos,
    })
  }

  return {
    // eslint-disable-next-line unicorn/no-array-sort
    artists: artists.sort((a, b) => a.name.localeCompare(b.name)),
    count: artists.length,
  }
}
