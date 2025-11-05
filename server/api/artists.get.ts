import type { Artist } from '#shared/schema'
import { filterArtists } from '#shared/utils'
import { data } from '@@/server/db'

export default defineEventHandler(async () => {
  const artistsData: { artists: Artist[], count: number } = filterArtists(data)

  return artistsData
})
