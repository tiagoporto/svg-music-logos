import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  root: './',
  test: {
    include: ['**/*.test.?(c|m)[jt]s?(x)'],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'text'],
      extension: ['.js', '.cjs', '.mjs', '.ts', '.mts', '.tsx', '.jsx'],
      exclude: ['.nuxt', '*.config.*', 'gulpfile.js'],
    },
  },
})
