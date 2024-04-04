import data from './data.json'

export default defineEventHandler(async (event) => {
  const origins = [
    ...new Set(
      data
        .map((artist) => {
          if (process.env.NODE_ENV !== 'production') {
            artist.origin ||
              console.warn(`${artist.name} is missing the origin.`)
          }

          return artist.origin
        })
        .filter((origin) => origin !== undefined)
        .flat()
        .sort(),
    ),
  ]

  return { origins, length: origins.length }
})
