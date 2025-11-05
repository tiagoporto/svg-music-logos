import type { Artist } from '#shared/schema'

export const filterOrigins = (data: Artist[]) => {
  if (!data) {
    return { origins: [], count: 0 }
  }

  const allOrigins = data.flatMap((artist) => {
    if (process.env.NODE_ENV !== 'production' && !artist.origins) {
      console.warn(`${artist.id}: missing origin.`)
    }

    return artist.origins
  })

  // eslint-disable-next-line unicorn/no-array-sort
  const origins = [...new Set(allOrigins)].filter(Boolean).sort()

  return { origins, count: origins.length }
}
