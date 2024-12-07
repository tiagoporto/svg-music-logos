import { data } from '../../db'
import type { Logo } from '../../db/schema'
import * as changeCase from 'change-case'

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
    const filename = `${artist.id}_${changeCase.kebabCase(logo.title)}.svg`
    const path = `/logos/${artist.id}/${filename}`

    splittedLogos.push({
      title: logo.title,
      inverse: logo.inverse,
      svg: path,
    })
  })

  return {
    artist: { ...artist, logos: splittedLogos },
  }
})
