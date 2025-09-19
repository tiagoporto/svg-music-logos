import { filterLogos } from '../utils'
import { data } from '../db'
import type { Logos, Origins } from '../db/schema'

export default defineEventHandler(async (event) => {
  const logosData: { logos: Logos[]; count: number } = filterLogos(data)

  const query: { genre: string; origin: Origins; page: number } =
    getQuery(event)
  const { genre, origin, page } = query

  if (Object.keys(query).length) {
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

  const pageSize = 30
  const pages = []

  for (let i = 0; i < logosData.logos.length; i += pageSize) {
    pages.push(logosData.logos.slice(i, i + pageSize))
  }

  logosData.logos = pages[page - 1]

  return {
    ...logosData,
    pagination: {
      totalRecords: logosData.count,
      currentPage: Number(page),
      totalPages: pages.length,
    },
  }
})
