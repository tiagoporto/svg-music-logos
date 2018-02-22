const autoprefixer = require('gulp-autoprefixer')
const config = require('./.swillrc.json')
const file = require('gulp-file')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp')
const mergeMediaQueries = require('gulp-merge-media-queries')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const path = require('path')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const sequence = require('run-sequence')
const stylus = require('gulp-stylus')
const del = require('del')

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
  }

  return streaming(
    gulp.src([
      path.join(paths.styles.src, 'logos/*.styl'),
      path.join(`!${paths.styles.src}`, '**/_*.styl')
    ])
      .pipe(newer({dest: path.join(paths.src, 'logos'), ext: '.css', extra: paths.styles.src}))
  )
})

gulp.task('images', () => {
  return gulp
    .src([
      path.join(paths.images.src, '**/*.{bmp,gif,jpg,jpeg,png,svg,eps}'),
      path.join(`!${paths.images.src}`, 'sprite/**/*')
    ])
    .pipe(plumber())
    .pipe(newer(paths.images.dist))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ], {
      verbose: true
    }
    ))
    .pipe(gulp.dest(paths.images.dist))
})
// *************************** Utility Tasks ****************************** //

// Clean Directories
gulp.task('clean', () => {
  return del(paths.dist)
})

// Serve the project and watch
gulp.task('watch', () => {
  gulp.watch(path.join(paths.styles.src, 'logos/*.{styl,scss,sass}'), 'styles')
})

gulp.task('copy', () => {
  return gulp
    .src([
      path.join(paths.src, '*.*'),
      path.join(`!${paths.src}`, '*.{js,vue}'),
      path.join(paths.src, 'logos/**/*')
    ], {base: `./${paths.src}`})
    .pipe(gulp.dest(paths.dist))
})

// ***************************** Main Tasks ******************************* //

// Build Project
gulp.task('build', callback => {
  sequence('styles', ['images', 'copy'], () => callback())
})

// Build the project and push the builded folder to gh-pages branch
gulp.task('gh-pages', ['build'], () => {
  return gulp
    .src(path.join(paths.dist, '**/*'))
    .pipe(ghPages())
})
