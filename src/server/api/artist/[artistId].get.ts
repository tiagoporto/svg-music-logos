import { data } from '../../db'
import type { Logo } from '../../db/schema'
import { createSVGPath } from '../../utils/createSVGPath'

export default defineEventHandler(async (event) => {
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

  return {
    artist: { ...artist, logos: processedLogos },
  }
})
