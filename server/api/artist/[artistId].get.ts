import type { Logo } from '#shared/schema'
import { createSVGPath } from '#shared/utils/create-svg-path'
import { data } from '@@/server/db'

export default defineEventHandler(async (event) => {
  const query: {
    page?: string
    itemsPerPage?: string
  } = getQuery(event)
  const { page, itemsPerPage } = query
  const currentPage = Number(page) || 1
  const itemsPerPageNumber = Number(itemsPerPage) || 30
  const artistId = getRouterParam(event, 'artistId') || ''

  const artist = data.find((artist) => {
    return artist.id === artistId
  })

  if (!artist) {
    return
  }

  const processedLogos: Logo[] = []
  const { logos } = artist

  for (const logo of logos) {
    const path = createSVGPath({ id: artist.id, title: logo.title })

    processedLogos.push({
      title: logo.title,
      svg: path,
      ...(logo.inverse === undefined ? {} : { inverse: logo.inverse }),
    })
  }

  const pages = []

  for (let i = 0; i < processedLogos.length; i += itemsPerPageNumber) {
    pages.push(processedLogos.slice(i, i + itemsPerPageNumber))
  }

  return {
    artist: { ...artist, logos: pages[currentPage - 1] },
    pagination: {
      currentPage,
      totalRecords: processedLogos.length,
      totalPages: pages.length,
    },
  }
})
