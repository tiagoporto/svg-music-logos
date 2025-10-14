import * as changeCase from 'change-case'
import { src, dest } from 'gulp'
import changed from 'gulp-changed'
import jsonConcat from 'gulp-concat-json-to-array'
import replace from 'gulp-replace'
import gulpSass from 'gulp-sass'
import zip from 'gulp-zip'
import { Buffer } from 'node:buffer'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { format as prettierFormat } from 'prettier'
import * as sassEmbedded from 'sass-embedded'
import through from 'through2'
import Vinyl from 'vinyl'

import { injectCSSinSVG, injectClassName } from './utils/index.ts'
import {
  filterGenres,
  filterLogos,
  filterOrigins,
} from '../server/utils/index.ts'

const sass = gulpSass(sassEmbedded)
export const paths = {
  public: 'public/',
  db: 'server/db/',
  logos: 'logos/',
}

export const updateReadme = () => {
  const data = JSON.parse(readFileSync('./server/db/data.json'))
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

export const generateData = () => {
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
          const formattedJson = await prettierFormat(json, {
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

export const styles = () => {
  return src(paths.logos + '**/*.scss')
    .pipe(changed(paths.logos, { extension: '.css' }))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.logos))
}

export const transformCopySVGs = () => {
  return src(paths.logos + '**/*.json')
    .pipe(
      (() => {
        let newFile
        const transform = async function (file, encoding, callback) {
          const { logos, id } = JSON.parse(file.contents.toString())
          const directoryPath = path.dirname(file.path)
          const logoName = []

          for (const logo of logos) {
            let svg = readFileSync(
              `${process.cwd()}/${paths.logos}${id}/${logo.svg}`,
              'utf8',
            )

            if (logo.className) {
              svg = injectClassName(svg, logo.className)
            }

            if (logo.css) {
              const css = readFileSync(
                `${process.cwd()}/${paths.logos}${id}/${logo.css}`,
                'utf8',
              )

              svg = injectCSSinSVG({
                svg,
                css,
              })
            }

            const filename = `${id}_${changeCase.kebabCase(logo.title)}.svg`

            // check if logo name is duplicated
            for (const name of logoName) {
              if (name === filename) {
                console.error(
                  `\u001B[31mDuplicated logo title: ${filename}\u001B[0m`,
                )
              }
            }

            logoName.push(filename)
            newFile = new Vinyl({
              base: file.base,
              path: `${directoryPath}/${filename}`,
              contents: Buffer.from(svg),
            })

            this.push(newFile)
          }

          callback()
        }

        return through.obj(transform)
      })(),
    )
    .pipe(
      (() => {
        return through.obj(async function (file, encoding, callback) {
          console.warn(
            `\u001B[33mFile saved: ${path.relative(file.base, file.path)}\u001B[0m`,
          )

          const unformattedCode = file.contents.toString('utf8')
          const svgFormatted = await prettierFormat(unformattedCode, {
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
