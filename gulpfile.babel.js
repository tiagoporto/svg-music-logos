/*
* Swill Boilerplate v1.0.0beta
* https://github.com/tiagoporto/swill-boilerplate
* Copyright (c) 2014-2017 Tiago Porto (http://tiagoporto.com)
* Released under the MIT license
*/

import autoprefixer from 'gulp-autoprefixer'
import babel from 'gulp-babel'
import browserSync from 'browser-sync'
import buffer from 'vinyl-buffer'
import concat from 'gulp-concat'
import config from './config.json'
import csslint from 'gulp-csslint'
import csso from 'gulp-csso'
import del from 'del'
import eslint from 'gulp-eslint'
import file from 'gulp-file'
import ghPages from 'gulp-gh-pages'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import htmlmin from 'gulp-htmlmin'
import imagemin from 'gulp-imagemin'
import merge from 'merge-stream'
import mergeMediaQueries from 'gulp-merge-media-queries'
import newer from 'gulp-newer'
import notify from 'gulp-notify'
import path from 'path'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import replace from 'gulp-replace'
import sequence from 'run-sequence'
import spritesmith from 'gulp.spritesmith'
import stylus from 'gulp-stylus'
import svg2png from 'gulp-svg2png'
import svgSprite from 'gulp-svg-sprite'
import uglify from 'gulp-uglify'
import useref from 'gulp-useref'
import w3cjs from 'gulp-w3cjs'

// ***************************** Path configs ***************************** //

const basePaths = config.basePaths

const paths = {
  handlebars: {
    src: path.join(basePaths.src, basePaths.handlebars.src)
  },

  images: {
    src: path.join(basePaths.src, basePaths.images.src),
    dest: path.join(basePaths.dest, basePaths.images.dest),
    build: path.join(basePaths.build, basePaths.images.src)
  },

  sprite: {
    src: path.join(basePaths.src, basePaths.images.src, basePaths.sprite.src)
  },

  scripts: {
    src: path.join(basePaths.src, basePaths.scripts.src),
    dest: path.join(basePaths.dest, basePaths.scripts.dest),
    build: path.join(basePaths.build, basePaths.scripts.dest)
  },

  styles: {
    src: path.join(basePaths.src, basePaths.styles.src),
    dest: path.join(basePaths.dest, basePaths.styles.dest),
    build: path.join(basePaths.build, basePaths.styles.dest)
  }
}

// ******************************** Tasks ********************************* //

gulp.task('html', () => {
  return gulp
    .src([
      path.join(basePaths.dest, '**/*.html'),
      path.join(`!${basePaths.dest}`, 'lang/outdated_browser/**/*.html')
    ])
    .pipe(plumber())
    .pipe(gulpIf(config.validateW3C, w3cjs()))
    .pipe(notify({message: 'HTML task complete', onLast: true}))
})

// ========= Scripts ========= //

// Lint Script
gulp.task('scripts:lint', () => {
  return gulp
    .src(path.join(paths.scripts.src, '**/*.{js,jsx}'))
    .pipe(gulpIf(config.lintJS, eslint()))
    .pipe(gulpIf(config.lintJS, eslint.format()))
})

// Compile, Minify and Lint Script
gulp.task('scripts', ['scripts:lint'], () => {
  // shell.task('webpack --progress --colors')
  return gulp
    .src([
      path.join(paths.scripts.src, '*.js'),
      path.join(`!${paths.scripts.src}`, 'index.js')
    ])
    .pipe(plumber())
    .pipe(newer(paths.scripts.dest))
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(notify({message: 'Scripts task complete', onLast: true}))
})

// ========= Styles ========= //

gulp.task('styles:lint', () => {
  return gulp
    .src([
      path.join(paths.styles.src, '*.styl'),
      path.join(`!${paths.styles.src}`, '_*.styl'),
      path.join(paths.styles.src, 'styles.scss')
    ])
    .pipe(gulpIf(config.lintCSS, csslint('./.csslintrc')))
    .pipe(gulpIf(config.lintCSS, csslint.formatter()))
})

gulp.task('styles', ['styles:lint'], () => {
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
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(csso())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(notify({message: 'Styles task complete', onLast: true}))
  }

  const main = streaming(
    gulp.src([
      path.join(paths.styles.src, 'styles.styl'),
      path.join(`!${paths.styles.src}`, '**/_*.styl')
    ])
  )

  const others = streaming(
    gulp.src([
      path.join(paths.styles.src, '**/*.styl'),
      path.join(`!${paths.styles.src}`, 'styles.styl'),
      path.join(`!${paths.styles.src}`, '**/_*.styl')
    ])
      .pipe(newer({dest: paths.styles.dest, ext: '.css', extra: paths.styles.src}))
  )

  return merge(main, others)
})

gulp.task('styles-helpers', () => {
  return gulp
    .src([
      path.join(paths.styles.src, 'helpers/mixins/*.styl'),
      path.join(paths.styles.src, 'helpers/functions/*.styl')
    ])
    .pipe(plumber())
    .pipe(concat('_helpers.styl'))
    .pipe(gulp.dest(path.join(paths.styles.src, 'helpers')))
})

// ========= Images ========= //

// Optimize Images
gulp.task('images', () => {
  const images = gulp
    .src([
      path.join(paths.images.src, '**/*.{bmp,gif,jpg,jpeg,png,svg}'),
      path.join(`!${paths.sprite.src}`, '**/*')
    ])
    .pipe(plumber())
    .pipe(newer(paths.images.dest))
    .pipe(imagemin({optimizationLevel: 5, progressive: true}))
    .pipe(gulp.dest(paths.images.dest))

  const svg = gulp
    .src([
      path.join(paths.images.src, '**/*.svg'),
      path.join(`!${paths.sprite.src}`, '**/*')
    ])
    .pipe(plumber())
    .pipe(newer(paths.images.dest))
    .pipe(svg2png())
    .pipe(gulp.dest(paths.images.dest))
    .pipe(notify({message: 'Images task complete', onLast: true}))

  return merge(images, svg)
})

// Generate Bitmap Sprite
gulp.task('bitmap-sprite', () => {
  const sprite = gulp
    .src(path.join(paths.sprite.src, '**/*.png'))
    .pipe(plumber())
    .pipe(
      spritesmith({
        imgName: 'bitmap-sprite.png',
        cssName: '_bitmap-sprite.styl',
        cssOpts: {
          cssSelector: item => {
            if (item.name.indexOf('~hover') !== -1) {
              return `.icon-${item.name.replace('~hover', ':hover')}`
            } else {
              return `.icon-${item.name}`
            }
          }
        },
        imgPath: path.join('../', basePaths.images.dest, 'bitmap-sprite.png'),
        padding: 2,
        algorithm: 'top-down'
      })
    )

  sprite.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))

  sprite.css
    .pipe(gulp.dest(path.join(paths.styles.src, 'helpers')))
    .pipe(notify({message: 'Bitmap sprite task complete', onLast: true}))

  return sprite
})

// Generate SVG Sprite
gulp.task('vector-sprite', () => {
  const spriteOptions = {
    shape: {
      spacing: {padding: 2}
    },
    mode: {
      css: {
        prefix: `${config.svgPrefixClass}%s`,
        dest: './',
        sprite: path.join('../', basePaths.images.dest, 'vector-sprite.svg'),
        layout: 'vertical',
        bust: false,
        render: {}
      }
    }
  }

  spriteOptions.mode.css.render.styl = {}

  spriteOptions.mode.css.render.styl.dest = path.join('../../', paths.styles.src, 'helpers/_vector-sprite.styl')

  return gulp
    .src(path.join(paths.sprite.src, `*.svg`))
    .pipe(plumber())
    .pipe(svgSprite(spriteOptions))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(notify({message: 'SVG sprite task complete', onLast: true}))
})

// Fallback convert SVG to PNG
gulp.task('svg2png', () => {
  return gulp
    .src(path.join(paths.images.dest, 'vector-sprite.svg'))
    .pipe(plumber())
    .pipe(svg2png())
    .pipe(gulp.dest(paths.images.dest))
})

// *************************** Utility Tasks ****************************** //

// Clean Directories
gulp.task('clean', cb => {
  const cleanPaths = [
    basePaths.build,
    paths.styles.dest,
    path.join(paths.scripts.dest, '**/*'),
    `!${path.join(paths.scripts.dest, 'bundle.js')}`,
    path.join(paths.styles.src, 'helpers/{_bitmap-sprite,_vector-sprite}.{styl,scss}'),
    path.join(paths.images.dest, '**/*')
  ]

  return del(cleanPaths.concat(basePaths.clean.ignore), cb)
})

// Copy Files to Build
gulp.task('copy', () => {
  // Minify and Copy HTML & PHP
  const html = gulp
    .src(path.join(basePaths.dest, '**/*.{html,php}'))
    .pipe(useref({searchPath: basePaths.dest}))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', csso()))
    .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true, spare: true, empty: true, conditionals: true})))
    .pipe(gulpIf('*.php', htmlmin({collapseWhitespace: true, spare: true, empty: true, conditionals: true})))
    .pipe(gulp.dest(basePaths.build))

  // Copy All Other files except HTML, PHP, CSS e JS Files
  const allFiles = gulp
    .src([
      path.join(basePaths.dest, '**/*'),
      path.join(`!${paths.styles.dest}`, '**/*'),
      path.join(`!${paths.scripts.dest}`, '**/*'),
      path.join(`!${basePaths.dest}`, '**/*.{html,php}')
    ], {dot: true})
    .pipe(gulp.dest(basePaths.build))

  return merge(html, allFiles)
})

// Copy lang files from outdatedbrowser
gulp.task('outdatedbrowser', () => {
  return gulp
    .src('node_modules/outdatedbrowser/outdatedbrowser/lang/*')
    .pipe(gulp.dest(path.join(basePaths.dest, 'lang/outdated_browser')))
})

// Serve the project and watch
gulp.task('watch', () => {
  browserSync(config.browserSync)
  gulp.watch(path.join(paths.sprite.src, '**/*.{png,gif}'), ['bitmap-sprite', browserSync.reload])
  gulp.watch(path.join(paths.sprite.src, '**/*.svg'), ['vector-sprite', 'styles', browserSync.reload])
  gulp.watch(path.join(paths.images.dest, '**/*.svg'), ['svg2png', browserSync.reload])
  gulp.watch(path.join(paths.scripts.src, '**/*.{js,jsx}'), ['scripts'])
  gulp.watch(path.join(paths.scripts.src, '**/*.{js,jsx}'), browserSync.reload)
  gulp.watch(path.join(paths.styles.src, 'helpers/{mixins,functions}/*.{styl,scss,sass}'), ['styles-helpers'])
  gulp.watch(
    [
      path.join(paths.images.src, '**/*.{bmp,gif,jpg,jpeg,png,svg}'),
      path.join(`!${paths.sprite.src}`, '**/*')
    ],
    ['images', browserSync.reload]
  )
  gulp.watch(
    [
      path.join(paths.styles.src, '**/*.{styl,scss,sass}'),
      path.join(`!${paths.styles.src}`, 'helpers/{mixins,functions}/*.{styl,scss,sass}')
    ],
    ['styles', browserSync.reload]
  )
  gulp.watch(
    [
      path.join(basePaths.src, '**/*.{html,hbs}'),
      path.join(basePaths.dest, '**/*.html')
    ],
    ['html', browserSync.reload]
  )
  gulp.watch(
    [
      path.join(basePaths.dest, '**/*'),
      path.join(`!${basePaths.dest}`, '**/*.{html,php,css,js,bmp,gif,jpg,jpeg,png,svg}')
    ],
    [browserSync.reload]
  )
})

// ***************************** Main Tasks ******************************* //

// Clean and compile the project
gulp.task('compile', ['clean'], () => {
  sequence(
    [
      'outdatedbrowser',
      'html',
      'images',
      'bitmap-sprite',
      'vector-sprite',
      'styles-helpers'
    ],
    'svg2png',
    'styles',
    'scripts:lint'
  )
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
