const autoprefixer = require('gulp-autoprefixer')
const config = require('./config.json')
const file = require('gulp-file')
const gulp = require('gulp')
const mergeMediaQueries = require('gulp-merge-media-queries')
const newer = require('gulp-newer')
const path = require('path')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const stylus = require('gulp-stylus')
const del = require('del')
const data = require('./src/data.js')
var jsonConcat = require('gulp-concat-jsons')
var jsonminify = require('gulp-jsonminify')
var gulpIgnore = require('gulp-ignore')

// ***************************** Path configs ***************************** //

const paths = config.basePaths

paths.styles = {
  src: path.join(paths.src, paths.styles),
  dist: path.join(paths.dist, paths.styles),
  build: path.join(paths.build, paths.styles)
}

// ******************************** Tasks ********************************* //

const updateReadme = () => {
  return gulp
    .src('./README.md')
    .pipe(
      replace(
        /<!-- replace start -->[\W\w]+<!-- replace end -->/,
        `<!-- replace start -->
![Total Artists](https://img.shields.io/badge/artists-${
  data.artists.length
}-blue.svg?style=flat-square)
![Total Logos](https://img.shields.io/badge/logos-${
  data.logos.length
}-blue.svg?style=flat-square)
![Total Origins](https://img.shields.io/badge/origins-${
  data.origins.length
}-blue.svg?style=flat-square)
![Total Genres](https://img.shields.io/badge/genres-${
  data.genres.length
}-blue.svg?style=flat-square)
<!-- replace end -->`
      )
    )
    .pipe(gulp.dest('./'))
}

// const streaming = src => {
//   return src
//     .pipe(plumber())
//     .pipe(
//       stylus({
//         include: ['node_modules'],
//         'include css': true
//       }).on('error', err => {
//         console.log(err.message)
//         // If rename the stylus file change here
//         file(
//           'styles.css',
//           `body:before{white-space: pre; font-family: monospace; content: "${
//             err.message
//           }";}`,
//           { src: true }
//         )
//           .pipe(replace('\\', '/'))
//           .pipe(replace(/\n/gm, '\\A '))
//           .pipe(replace('"', "'"))
//           .pipe(replace("content: '", 'content: "'))
//           .pipe(replace("';}", '";}'))
//           .pipe(gulp.dest(paths.styles.dest))
//       })
//     )
//     .pipe(autoprefixer({ browsers: config.autoprefixerBrowsers }))
//     .pipe(mergeMediaQueries({ log: true }))
//     .pipe(gulp.dest(path.join(__dirname, 'public/logos')))
// }

// return streaming(
// )
/** newer({
     dest: path.join(paths.src, 'logos'),
     ext: '.css',
     extra: paths.styles.src
   }) */
const styles = () => {
  return gulp
    .src('public/logos/**/*.styl')
    .pipe(
      stylus({
        include: ['node_modules'],
        'include css': true
      })
    )
    .pipe(gulp.dest('public/logos'))
}

// *************************** Utility Tasks ****************************** //

// Clean Directories
const clean = () => del(paths.dist)

const watch = () => {
  gulp.watch('public/logos/**/*.styl', styles)
  gulp.watch('public/logos/**/*.json', generateData)
}

const copy = () => {
  return gulp
    .src(
      [
        path.join(paths.src, '*.*'),
        path.join(`!${paths.src}`, '*.vue'),
        path.join(`!${paths.src}`, 'serviceWorker.js'),
        path.join(`!${paths.src}`, 'index.js'),
        path.join(`!${paths.src}`, 'data.js'),
        path.join(paths.src, 'logos/**/*')
      ],
      { base: `./${paths.src}` }
    )
    .pipe(gulp.dest(paths.dist))
}

const generateData = () => {
  return gulp
    .src('./public/logos/**/*.json')
    .pipe(jsonConcat('data.json'))
    .pipe(gulpIgnore('!data.json'))
    .pipe(jsonminify())
    .pipe(gulp.dest('./public'))
}

// ***************************** Main Tasks ******************************* //

const build = gulp.series(clean, styles, gulp.parallel(updateReadme, copy))

exports['update-readme'] = updateReadme
exports.styles = styles
exports.clean = clean
exports.watch = watch
exports.copy = copy
exports['generate-data'] = generateData
exports.build = build
