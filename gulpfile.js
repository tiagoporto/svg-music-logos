import fs from 'node:fs'
import * as prettier from 'prettier'
import { Buffer } from 'node:buffer'
import { src, dest, series, parallel, watch as gulpWatch } from 'gulp'
import replace from 'gulp-replace'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import jsonConcat from 'gulp-concat-json-to-array'
import changed from 'gulp-changed'
import through from 'through2'
import { readFileSync } from 'fs'
import Vinyl from 'vinyl'
import path from 'path'
import zip from 'gulp-zip'
import * as changeCase from 'change-case'
import { injectCSSinSVG, injectClassName } from './utils/index.js'
import { filterGenres } from './src/server/utils/filterGenres.js'
import { filterLogos } from './src/server/utils/filterLogos.js'
import { filterOrigins } from './src/server/utils/filterOrigins.js'

const sass = gulpSass(dartSass)
const paths = {
  public: 'public/',
  db: 'src/server/db/',
  logos: 'src/logos/',
}

const updateReadme = () => {
  const data = JSON.parse(fs.readFileSync('./src/server/db/data.json'))
  const { count: genresCount } = filterGenres(data)
  const { count: originsCount } = filterOrigins(data)
  const { count: logosCount } = filterLogos(data)

  return src('./README.md')
    .pipe(
      replace(
        /<!-- replace start -->[\W\w]+<!-- replace end -->/,
        `<!-- replace start -->

![Total Artists](https://img.shields.io/badge/artists-${data.length}-blue.svg?style=flat-square)
![Total Logos](https://img.shields.io/badge/logos-${logosCount}-blue.svg?style=flat-square)
![Total Origins](https://img.shields.io/badge/origins-${originsCount}-blue.svg?style=flat-square)
![Total Genres](https://img.shields.io/badge/genres-${genresCount}-blue.svg?style=flat-square)

<!-- replace end -->`,
      ),
    )
    .pipe(dest('./'))
}

const generateData = () => {
  return src(paths.logos + '**/*.json')
    .pipe(
      jsonConcat('data.json', (data) => {
        return Buffer.from(JSON.stringify(data))
      }),
    )
    .pipe(
      (() => {
        const transform = async function (file, encoding, callback) {
          const json = file.contents.toString('utf8')
          const formattedJson = await prettier.format(json, {
            parser: 'json',
          })

          file.contents = Buffer.from(formattedJson)
          this.push(file)
          callback()
        }

        return through.obj(transform)
      })(),
    )
    .pipe(dest(paths.db))
}

const styles = () => {
  return src(paths.logos + '**/*.scss')
    .pipe(changed(paths.logos, { extension: '.css' }))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.logos))
}

const transformCopySVGs = () => {
  return src(paths.logos + '**/*.json')
    .pipe(
      (() => {
        let newFile
        const transform = async function (file, encoding, callback) {
          const { logos, id } = JSON.parse(file.contents.toString())
          const directoryPath = path.dirname(file.path)
          const logoName = []

          logos.forEach(async (logo) => {
            let svg = readFileSync(
              `${process.cwd()}/src/logos/${id}/${logo.svg}`,
              'utf8',
            )

            if (logo.className) {
              svg = injectClassName(svg, logo.className)
            }

            if (logo.css) {
              const css = readFileSync(
                `${process.cwd()}/src/logos/${id}/${logo.css}`,
                'utf8',
              )

              svg = injectCSSinSVG({
                svg,
                css,
              })
            }

            const filename = `${id}_${changeCase.kebabCase(logo.title)}.svg`

            // check if logo name is duplicated
            logoName.forEach((name) => {
              if (name === filename) {
                console.error(
                  `\x1b[31mDuplicated logo title: ${filename}\x1b[0m`,
                )
              }
            })

            logoName.push(filename)
            newFile = new Vinyl({
              base: file.base,
              path: `${directoryPath}/${filename}`,
              contents: Buffer.from(svg),
            })

            this.push(newFile)
          })

          callback()
        }

        return through.obj(transform)
      })(),
    )
    .pipe(
      (() => {
        return through.obj(async function (file, encoding, callback) {
          console.warn(
            `\x1b[33mFile saved: ${path.relative(file.base, file.path)}\x1b[0m`,
          )

          const unformattedCode = file.contents.toString('utf8')
          const svgFormatted = await prettier.format(unformattedCode, {
            printWidth: 1000,
            parser: 'html',
          })
          file.contents = Buffer.from(svgFormatted)

          callback(null, file)
        })
      })(),
    )
    .pipe(dest(paths.public + 'logos'))
    .pipe(zip('svg-music-logos.zip'))
    .pipe(dest(paths.public + 'logos/'))
}

// ***************************** Tasks ******************************* //

// Update README with artists, logos, origins and genre count
export { updateReadme as 'update-readme' }

// Unify all "src/logos/**/*.json" into "src/server/db/data.json"
export { generateData as 'generate-data' }

// Compile all "src/logos/**/*.styl"
export { styles as 'generate-styles' }

// Extract SVGs from "src/logos/**/*.json" inject related css and copy in "public/logos/[artist]"
export { transformCopySVGs as 'copy-svgs' }

export const build = series(parallel(styles, generateData), transformCopySVGs)
export const watch = () => {
  gulpWatch(paths.logos + '**/*.{scss,json}', styles)
  gulpWatch(paths.logos + '**/*.json', generateData)
  gulpWatch(paths.logos + '**/*.{scss,json,svg}', transformCopySVGs)
}
