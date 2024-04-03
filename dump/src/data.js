import data from './data.json' assert { type: 'json' }

data.sort((a, b) => {
  const nameA = a.name.toLowerCase()
  const nameB = b.name.toLowerCase()

  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0
})

const allGenres = data
  .map((elem) => {
    if (process.env.NODE_ENV !== 'production') {
      elem.genre || console.warn(`${elem.name} is missing the genre.`)
    }

    return elem.genre
  })
  .join()
  .split(',')
  .filter((genre) => genre)

const genres = allGenres
  .filter((item, pos) => allGenres.indexOf(item) === pos)
  .sort()

const allOrigins = data
  .map((elem) => {
    if (process.env.NODE_ENV !== 'production') {
      elem.origin || console.warn(`${elem.name} is missing the origin.`)
    }

    return elem.origin
  })
  .join()
  .split(',')
  .filter((origin) => origin !== undefined)

const origins = allOrigins
  .filter((item, pos) => allOrigins.indexOf(item) === pos)
  .sort()

const logos = []

data.forEach((band, index) => {
  const getLogo = band.logos

  data[index].folder = getLogo[0].svg.split('.')[0].split('_')[0]

  getLogo.forEach((logo) => {
    logos.push({
      ...band,
      logo,
    })
  })
})

export default {
  genres,
  origins,
  logos,
  artists: data,
}
