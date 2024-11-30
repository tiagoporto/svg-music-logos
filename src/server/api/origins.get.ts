import { data } from '../db'

export default defineEventHandler(async () => {
  const origins = [
    ...new Set(
      data
        .map((artist) => {
          if (process.env.NODE_ENV !== 'production') {
            artist.origins ||
              console.warn(`${artist.name} is missing the origin.`)
          }

          return artist.origins
        })
        .filter((origin) => origin !== undefined)
        .flat()
        .sort(),
    ),
  ]

  return { origins, length: origins.length }
})
