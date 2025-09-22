import { filterLogos } from '../utils'
import { data } from '../db'
import type { Logos, Origins } from '../db/schema'

export default defineEventHandler(async (event) => {
  const logosData: { logos: Logos[]; count: number } = filterLogos(data)

  const query: {
    genre: string
    origin: Origins
    page?: string
    itemsPerPage?: string
  } = getQuery(event)
  const { genre, origin, page, itemsPerPage } = query
  const currentPage = Number(page) || 1
  const itemsPerPageNum = Number(itemsPerPage) || 30

  if (origin || genre) {
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

  if (logosData.logos.length === 0) {
    return null
  }

  const pages = []

  for (let i = 0; i < logosData.logos.length; i += itemsPerPageNum) {
    pages.push(logosData.logos.slice(i, i + itemsPerPageNum))
  }

  logosData.logos = pages[currentPage - 1]

  return {
    ...logosData,
    pagination: {
      totalRecords: logosData.count,
      currentPage: currentPage,
      totalPages: pages.length,
    },
  }
})
