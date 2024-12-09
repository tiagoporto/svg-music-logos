import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  root: './',
  test: {
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'text'],
    },
  },
})
