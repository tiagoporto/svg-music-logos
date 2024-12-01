import { data } from '../db'

export default defineEventHandler(async () => {
  const genres = [
    ...new Set(
      data
        .map((artist) => {
          if (process.env.NODE_ENV !== 'production' && !artist.genres) {
            console.warn(`${artist.name} is missing the genre.`)
          }

          return artist.genres
        })
        .filter((genre) => genre !== undefined)
        .flat()
        .sort(),
    ),
  ]

  return { genres, length: genres.length }
})
