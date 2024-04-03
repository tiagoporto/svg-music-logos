import data from './dump/src/data.js'
import { src, dest, series, parallel, watch as gulpWatch } from 'gulp'
import replace from 'gulp-replace'
import stylus from 'gulp-stylus'
import jsonMinify from 'gulp-jsonminify'
import jsonConcat from 'gulp-concat-json-to-array'
import changed from 'gulp-changed'

const paths = {
  src: 'dump/src/',
  public: 'dump/public/',
}

const styles = () => {
  return src(paths.public + 'logos/**/*.styl')
    .pipe(changed(paths.public + 'logos', { extension: '.css' }))
    .pipe(stylus())
    .pipe(dest(paths.public + 'logos'))
}

const updateReadme = () => {
  return src('./README.md')
    .pipe(
      replace(
        /<!-- replace start -->[\W\w]+<!-- replace end -->/,
        `<!-- replace start -->

![Total Artists](https://img.shields.io/badge/artists-${data.artists.length}-blue.svg?style=flat-square)
![Total Logos](https://img.shields.io/badge/logos-${data.logos.length}-blue.svg?style=flat-square)
![Total Origins](https://img.shields.io/badge/origins-${data.origins.length}-blue.svg?style=flat-square)
![Total Genres](https://img.shields.io/badge/genres-${data.genres.length}-blue.svg?style=flat-square)

<!-- replace end -->`,
      ),
    )
    .pipe(dest('./'))
}

const generateData = () => {
  return src(paths.public + 'logos/**/*.json')
    .pipe(
      jsonConcat('data.json', function (data) {
        // do any work on data here
        return new Buffer(JSON.stringify(data))
      }),
    )
    .pipe(jsonMinify())
    .pipe(dest(paths.src))
}

// ***************************** Tasks ******************************* //

export { updateReadme as 'update-readme' }
export { generateData as 'generate-data' }
export const watch = () => {
  gulpWatch(paths.public + 'logos/**/*.styl', styles)
  gulpWatch(paths.public + 'logos/**/*.json', generateData)
}
export const build = series(generateData, parallel(styles, updateReadme))
