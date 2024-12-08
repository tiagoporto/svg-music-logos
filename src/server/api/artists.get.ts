import { filterArtists } from '../utils'
import { data } from '../db'
import type { Artist } from '../db/schema'

export default defineEventHandler(async () => {
  const artistsData: { artists: Artist[]; count: number } = filterArtists(data)

  return artistsData
})
