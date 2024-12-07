import fs from 'node:fs'
import * as prettier from 'prettier'
import { Buffer } from 'node:buffer'
import { src, dest, series, parallel, watch as gulpWatch } from 'gulp'
import replace from 'gulp-replace'
import stylus from 'gulp-stylus'
import jsonConcat from 'gulp-concat-json-to-array'
import changed from 'gulp-changed'
import through from 'through2'
import { readFile } from 'fs/promises'
import Vinyl from 'vinyl'
import path from 'path'
import zip from 'gulp-zip'
import * as changeCase from 'change-case'
import {
  filterGenres,
  filterLogos,
  filterOrigins,
  injectCSSinSVG,
  injectClassName,
} from './utils/index.js'

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
  return src(paths.logos + '**/*.styl')
    .pipe(changed(paths.logos, { extension: '.css' }))
    .pipe(stylus())
    .pipe(dest(paths.logos))
}

const transformCopySVGs = () => {
  return src(paths.logos + '**/*.json')
    .pipe(
      (() => {
        let newFile
        const transform = function (file, encoding, callback) {
          const { logos, id } = JSON.parse(file.contents.toString())
          const directoryPath = path.dirname(file.path)

          logos.forEach(async (logo) => {
            let svg = await readFile(
              `${process.cwd()}/src/logos/${id}/${logo.svg}`,
              'utf8',
            )

            if (logo.className) {
              svg = injectClassName(svg, logo.className)
            }

            if (logo.css) {
              const css = await readFile(
                `${process.cwd()}/src/logos/${id}/${logo.css}`,
                'utf8',
              )

              svg = injectCSSinSVG({
                svg,
                css,
              })
            }

            const filename = `${id}_${changeCase.kebabCase(logo.title)}.svg`
            const svgFormatted = await prettier.format(svg, {
              printWidth: 1000,
              parser: 'html',
            })

            newFile = new Vinyl({
              base: file.base,
              path: `${directoryPath}/${filename}`,
              contents: Buffer.from(svgFormatted),
            })

            this.push(newFile)
          })

          callback()
        }

        return through.obj(transform)
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
  gulpWatch(paths.logos + '**/*.styl', styles)
  gulpWatch(paths.logos + '**/*.json', generateData)
  gulpWatch(paths.logos + '**/*.json', transformCopySVGs)
}
