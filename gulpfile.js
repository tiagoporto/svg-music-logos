const path = require('path')
const gulp = require('gulp')
const replace = require('gulp-replace')
const stylus = require('gulp-stylus')
const del = require('del')
var jsonConcat = require('gulp-concat-jsons')
var jsonminify = require('gulp-jsonminify')
var gulpIgnore = require('gulp-ignore')
// const file = require('gulp-file')
// const mergeMediaQueries = require('gulp-merge-media-queries')
// const newer = require('gulp-newer')
// const plumber = require('gulp-plumber')
// const rename = require('gulp-rename')
// const autoprefixer = require('gulp-autoprefixer')

const paths = {
  src: 'src/',
  dist: 'dist/',
  public: 'public/',
}

// return streaming(
// )
/** newer({
     dest: path.join(paths.src, 'logos'),
     ext: '.css',
     extra: paths.styles.src
    }) */
const styles = () => {
  return gulp
    .src(paths.public + 'logos/**/*.styl')
    .pipe(
      stylus({
        include: ['node_modules'],
        'include css': true,
      }),
    )
    .pipe(gulp.dest(paths.public + 'logos'))
}

const updateReadme = () => {
  const data = require('./src/data.js')
  return gulp
    .src('./README.md')
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
    .pipe(gulp.dest('./'))
}

const generateData = () => {
  return gulp
    .src(paths.public + 'logos/**/*.json')
    .pipe(jsonConcat('data.json'))
    .pipe(gulpIgnore('!data.json'))
    .pipe(jsonminify())
    .pipe(gulp.dest(paths.src))
}

const copy = () => {
  return gulp
    .src(
      [
        path.join(paths.public, '**/*.*'),
        path.join(`!${(paths.public, '**/*.html')}`),
      ],
      {
        base: `./${paths.public}`,
      },
    )
    .pipe(gulp.dest(paths.dist))
}

const clean = () => del(paths.dist)

const watch = () => {
  gulp.watch(paths.public + 'logos/**/*.styl', styles)
  gulp.watch(paths.public + 'logos/**/*.json', generateData)
}

const build = gulp.series(
  clean,
  generateData,
  gulp.parallel(styles, copy, updateReadme),
)

// ***************************** Tasks ******************************* //

exports['update-readme'] = updateReadme
exports.styles = styles
exports.clean = clean
exports.watch = watch
exports.copy = copy
exports['generate-data'] = generateData
exports.build = build
