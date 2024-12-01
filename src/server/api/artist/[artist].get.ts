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

  return new Promise((resolve) => {
    resolve(artist)
  })
})
