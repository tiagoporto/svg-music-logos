export const filterOrigins = (data) => {
  const allOrigins = data
    .map((artist) => {
      if (process.env.NODE_ENV !== 'production' && !artist.origins) {
        console.warn(`${artist.id}: missing origin.`)
      }

      return artist.origins
    })
    .flat()

  const origins = [...new Set(allOrigins)].sort()

  return { origins, count: origins.length }
}
