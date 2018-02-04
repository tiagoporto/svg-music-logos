/*
* Swill Boilerplate v1.0.0beta
* https://github.com/tiagoporto/swill-boilerplate
* Copyright (c) 2014-2017 Tiago Porto (http://tiagoporto.com)
* Released under the MIT license
*/

const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const config = require('./.swillrc.json')
const csso = require('gulp-csso')
const file = require('gulp-file')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp')
const mergeMediaQueries = require('gulp-merge-media-queries')
const newer = require('gulp-newer')
const notify = require('gulp-notify')
const path = require('path')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const sequence = require('run-sequence')
const stylus = require('gulp-stylus')

// ***************************** Path configs ***************************** //

const paths = config.basePaths

paths.images = {
  src: path.join(paths.src, paths.images),
  dist: path.join(paths.dist, paths.images),
  build: path.join(paths.build, paths.images)
}

paths.scripts = {
  src: path.join(paths.src, paths.scripts),
  dist: path.join(paths.dist, paths.scripts),
  build: path.join(paths.build, paths.scripts)
}

paths.styles = {
  src: path.join(paths.src, paths.styles),
  dist: path.join(paths.dist, paths.styles),
  build: path.join(paths.build, paths.styles)
}

// ******************************** Tasks ********************************* //

gulp.task('styles', () => {
  const streaming = src => {
    return src
      .pipe(plumber())
      .pipe(
        stylus({
          'include': [
            'node_modules'
          ],
          'include css': true
        })
          .on('error', err => {
            console.log(err.message)
            // If rename the stylus file change here
            file('styles.css', `body:before{white-space: pre; font-family: monospace; content: "${err.message}";}`, {src: true})
              .pipe(replace('\\', '/'))
              .pipe(replace(/\n/gm, '\\A '))
              .pipe(replace('"', '\''))
              .pipe(replace("content: '", 'content: "'))
              .pipe(replace('\';}', '";}'))
              .pipe(gulp.dest(paths.styles.dest))
              .pipe(rename({suffix: '.min'}))
              .pipe(gulp.dest(paths.styles.dest))
          }))
      .pipe(autoprefixer({browsers: config.autoprefixerBrowsers}))
      .pipe(mergeMediaQueries({log: true}))
      .pipe(gulp.dest(path.join(paths.src, 'logos')))
      .pipe(csso())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(path.join(paths.src, 'logos')))
      .pipe(notify({message: 'Styles task complete', onLast: true}))
  }

  return streaming(
    gulp.src([
      path.join(paths.styles.src, 'logos/*.styl'),
      path.join(`!${paths.styles.src}`, '**/_*.styl')
    ])
      .pipe(newer({dest: path.join(paths.src, 'logos'), ext: '.css', extra: paths.styles.src}))
  )
})
// *************************** Utility Tasks ****************************** //

// Serve the project and watch
gulp.task('watch', () => {
  gulp.watch(path.join(paths.styles.src, 'logos/*.{styl,scss,sass}'), 'styles')
})

// ***************************** Main Tasks ******************************* //

// Clean and compile the project
gulp.task('compile', () => {
  sequence('styles')
})

// Clean, compile, serve and watch the project
gulp.task('compile:watch', ['clean'], () => {
  sequence('compile', 'watch')
})

// Build Project
gulp.task('build', ['clean'], () => {
  sequence('compile', 'copy')
})

// Build Project and serve
gulp.task('build:serve', ['clean'], () => {
  sequence('build', () => browserSync(config.browserSyncBuild)
  )
})

// Build the project and push the builded folder to gh-pages branch
gulp.task('gh-pages', () => {
  sequence('build', () => {
    return gulp
      .src(path.join(basePaths.build, '**/*'))
      .pipe(ghPages())
  })
})
