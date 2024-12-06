import type { Logo } from '../../db/schema'

import { data } from '../../db'

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

  const splittedLogos: Logo[] = []

  artist?.logos.forEach((logo) => {
    const path = `/logos/${logo.svg.split('.')[0].split('_')[0]}`
    splittedLogos.push({
      ...logo,
      ...Object.assign(
        { svg: `${path}/${logo.svg}` },
        logo?.css && { css: `${path}/${logo.css}` },
      ),
    })
  })

  return {
    artist: { ...artist, logos: splittedLogos },
  }
})
