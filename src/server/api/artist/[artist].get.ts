import { data } from '../../db'
import type { Logo } from '../../db/schema'
import { createSVGPath } from '../../utils/createSVGPath'

export default defineEventHandler(async (event) => {
  let artistName = getRouterParam(event, 'artist') || ''
  artistName = artistName
    .replace(/-/g, ' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const artist = data.find((artist) => {
    return (
      artist.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') === artistName
    )
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

  return {
    artist: { ...artist, logos: processedLogos },
  }
})
