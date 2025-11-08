import type { Logos, Origins } from '#shared/schema'
import { filterLogos } from '#shared/utils'
import { data } from '@@/server/db'

interface QueryObject {
  genre?: string
  origin?: Origins
  page?: string
  itemsPerPage?: string
}

export default defineEventHandler(async (event) => {
  const logosData: { logos: Logos[], count: number } = filterLogos(data)

  const query = getQuery<QueryObject>(event) || {}
  const { genre, origin, page, itemsPerPage } = query
  const currentPage = Number(page) || 1
  const itemsPerPageNumber = Number(itemsPerPage) || 30

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
    return
  }

  const pages: Logos[][] = []

  for (let i = 0; i < logosData.logos.length; i += itemsPerPageNumber) {
    pages.push(logosData.logos.slice(i, i + itemsPerPageNumber))
  }

  return {
    logos: pages[currentPage - 1],
    count: logosData.count,
    pagination: {
      currentPage,
      totalRecords: logosData.count,
      totalPages: pages.length,
    },
  }
})
