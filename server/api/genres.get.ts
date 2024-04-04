import data from './data.json'

export default defineEventHandler(async (event) => {
  const genres = [
    ...new Set(
      data
        .map((artist) => {
          if (process.env.NODE_ENV !== 'production') {
            artist.genre || console.warn(`${artist.name} is missing the genre.`)
          }

          return artist.genre
        })
        .filter((genre) => genre !== undefined)
        .flat()
        .sort(),
    ),
  ]

  return { genres, length: genres.length }
})
