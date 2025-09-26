export const filterGenres = (data) => {
  if (!data) {
    return { genres: [], count: 0 }
  }

  const allGenres = data.flatMap((artist) => {
    if (process.env.NODE_ENV !== 'production' && !artist.genres) {
      console.warn(`${artist.id}: missing genre.`)
    }

    return artist.genres
  })
  const genres = [...new Set(allGenres)].filter(Boolean).sort()

  return {
    genres,
    count: genres.length,
  }
}
