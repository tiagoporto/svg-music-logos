import { filterGenres } from '#shared/utils'
import { data } from '@@/server/db'

export default defineEventHandler(async () => {
  const genresData: { genres: string[], count: number } = filterGenres(data)

  return genresData
})
