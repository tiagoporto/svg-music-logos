import { series, parallel, watch as gulpWatch } from 'gulp'

import { generateData, styles, transformCopySVGs, paths } from './gulpfile.ts'
export {
  // Update README with artists, logos, origins and genre count
  updateReadme as 'update-readme',
  // Merge all "logos/**/*.json" into "server/db/data.json"
  generateData as 'generate-data',
  // Compile all "logos/**/*.styl"
  styles as 'generate-styles',
  // Extract SVGs from "logos/**/*.json" inject related css and copy in "public/logos/[artist]"
  transformCopySVGs as 'copy-svgs',
} from './gulpfile.ts'

export const build = series(parallel(styles, generateData), transformCopySVGs)
export const watch = () => {
  gulpWatch(paths.logos + '**/*.scss', styles)
  gulpWatch(paths.logos + '**/*.json', generateData)
  gulpWatch(paths.logos + '**/*.svg', transformCopySVGs)
}
