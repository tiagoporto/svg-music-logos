import { data } from '#shared/db'
import type { Artist } from '#shared/db/schema'
import { filterArtists } from '#shared/utils'

export default defineEventHandler(async () => {
  const artistsData: { artists: Artist[], count: number } = filterArtists(data)

  return artistsData
})
