import type { Artist } from '#shared/db/schema'

export const filterGenres = (data: Artist[]) => {
  if (!data) {
    return { genres: [], count: 0 }
  }

  const allGenres = data.flatMap((artist) => {
    if (process.env.NODE_ENV !== 'production' && !artist.genres) {
      console.warn(`${artist.id}: missing genre.`)
    }

    return artist.genres
  })

  const filteredGenres = allGenres
    .filter((genre: string | undefined) => genre !== undefined)
    .sort()

  const genres = [...new Set(filteredGenres)]

  return {
    genres,
    count: genres.length,
  }
}
