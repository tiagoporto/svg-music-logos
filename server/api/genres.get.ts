import { data } from '#shared/db'

import { filterGenres } from '../utils'

export default defineEventHandler(async () => {
  const genresData: { genres: string[], count: number } = filterGenres(data)

  return genresData
})
