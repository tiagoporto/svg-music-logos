import { filterGenres } from '../utils'
import { data } from '../db'

export default defineEventHandler(async () => {
  const genresData: { genres: string[]; count: number } = filterGenres(data)
  return genresData
})
