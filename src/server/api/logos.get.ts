import { filterLogos } from '../utils'
import { data } from '../db'
import type { Logos, Origins } from '../db/schema'

export default defineEventHandler(async (event) => {
  const logosData: { logos: Logos[]; count: number } = filterLogos(data)

  const query: { genre: string; origin: Origins } = getQuery(event)

  if (Object.keys(query).length) {
    const { genre, origin } = query

    logosData.logos = logosData.logos.filter((artist) => {
      if (genre && origin) {
        return (
          artist.genres?.includes(genre) && artist.origins?.includes(origin)
        )
      }
      if (origin) {
        return artist.origins?.includes(origin)
      }

      if (genre) {
        return artist.genres?.includes(genre)
      }
      return artist
    })
  }

  return logosData
})
