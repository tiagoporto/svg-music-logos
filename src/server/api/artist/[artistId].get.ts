import { data } from '../../db'
import type { Logo } from '../../db/schema'
import { createSVGPath } from '../../utils/create-svg-path'

export default defineEventHandler(async (event) => {
  const query: {
    page?: string
    itemsPerPage?: string
  } = getQuery(event)
  const { page, itemsPerPage } = query
  const currentPage = Number(page) || 1
  const itemsPerPageNum = Number(itemsPerPage) || 30
  const artistId = getRouterParam(event, 'artistId') || ''

  const artist = data.find((artist) => {
    return artist.id === artistId
  })

  if (!artist) {
    return null
  }

  const processedLogos: Logo[] = []

  artist?.logos.forEach((logo) => {
    const path = createSVGPath({ id: artist.id, title: logo.title })

    processedLogos.push({
      title: logo.title,
      svg: path,
      ...(logo.inverse !== undefined ? { inverse: logo.inverse } : {}),
    })
  })

  const pages = []

  for (let i = 0; i < processedLogos.length; i += itemsPerPageNum) {
    pages.push(processedLogos.slice(i, i + itemsPerPageNum))
  }

  return {
    artist: { ...artist, logos: pages[currentPage - 1] },
    pagination: {
      totalRecords: processedLogos.length,
      currentPage: currentPage,
      totalPages: pages.length,
    },
  }
})
