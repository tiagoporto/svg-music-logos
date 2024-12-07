import fs from 'node:fs'
import { Buffer } from 'node:buffer'
import { src, dest, series, parallel, watch as gulpWatch } from 'gulp'
import replace from 'gulp-replace'
import stylus from 'gulp-stylus'
import jsonConcat from 'gulp-concat-json-to-array'
import changed from 'gulp-changed'
const getData = () => {
  const data = JSON.parse(fs.readFileSync('./src/server/db/data.json'))

  const allGenres = data
    .map((elem) => {
      if (process.env.NODE_ENV !== 'production' && !elem.genres) {
        console.warn(`${elem.name} is missing the genre.`)
      }

      return elem.genres
    })
    .join()
    .split(',')
    .filter((genre) => genre)

  const genres = allGenres
    .filter((item, pos) => allGenres.indexOf(item) === pos)
    .sort()

  const allOrigins = data
    .map((elem) => {
      if (process.env.NODE_ENV !== 'production' && !elem.origins) {
        console.warn(`${elem.name} is missing the origin.`)
      }

      return elem.origins
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

  return {
    data,
    genres,
    origins,
    logos,
  }
}

const paths = {
  db: 'src/server/db',
  logos: 'src/logos/',
}

const styles = () => {
  return src(paths.logos + '**/*.styl')
    .pipe(changed(paths.logos, { extension: '.css' }))
    .pipe(stylus())
    .pipe(dest(paths.logos))
}

const updateReadme = () => {
  const { data, genres, origins, logos } = getData()

  return src('./README.md')
    .pipe(
      replace(
        /<!-- replace start -->[\W\w]+<!-- replace end -->/,
        `<!-- replace start -->

![Total Artists](https://img.shields.io/badge/artists-${data.length}-blue.svg?style=flat-square)
![Total Logos](https://img.shields.io/badge/logos-${logos.length}-blue.svg?style=flat-square)
![Total Origins](https://img.shields.io/badge/origins-${origins.length}-blue.svg?style=flat-square)
![Total Genres](https://img.shields.io/badge/genres-${genres.length}-blue.svg?style=flat-square)

<!-- replace end -->`,
      ),
    )
    .pipe(dest('./'))
}

const generateData = () => {
  return src(paths.logos + '**/*.json')
    .pipe(
      jsonConcat('data.json', function (data) {
        return Buffer.from(JSON.stringify(data))
      }),
    )
    .pipe(dest(paths.db))
}

// ***************************** Tasks ******************************* //

export { updateReadme as 'update-readme' }
export { generateData as 'generate-data' }
export const watch = () => {
  gulpWatch(paths.logos + '**/*.styl', styles)
  gulpWatch(paths.logos + '**/*.json', generateData)
}
export const build = series(generateData, parallel(styles, updateReadme))
export { styles as 'generate-styles' }
