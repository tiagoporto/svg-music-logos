import { describe, it, expect, expectTypeOf } from 'vitest'

import {
  'update-readme' as updateReadme,
  'generate-data' as generateData,
  'generate-styles' as generateStyles,
  'copy-svgs' as copySVGs,
  build,
  watch,
} from './'

describe('gulpfile.ts index exports', () => {
  it('should export updateReadme from gulpfile.ts', () => {
    expect.hasAssertions()
    expect(updateReadme).toBeDefined()

    expectTypeOf(updateReadme).toBeFunction()
  })

  it('should export generateData from gulpfile.ts', () => {
    expect.hasAssertions()
    expect(generateData).toBeDefined()

    expectTypeOf(generateData).toBeFunction()
  })

  it('should export generateStyles from gulpfile.ts', () => {
    expect.hasAssertions()
    expect(generateStyles).toBeDefined()

    expectTypeOf(generateStyles).toBeFunction()
  })

  it('should export copySVGs from gulpfile.ts', () => {
    expect.hasAssertions()
    expect(copySVGs).toBeDefined()

    expectTypeOf(copySVGs).toBeFunction()
  })

  it('should export build as a gulp series', () => {
    expect.hasAssertions()
    expect(build).toBeDefined()

    expectTypeOf(build).toBeFunction()
  })

  it('should export watch as a function', () => {
    expect.hasAssertions()
    expect(watch).toBeDefined()

    expectTypeOf(watch).toBeFunction()
  })
})
