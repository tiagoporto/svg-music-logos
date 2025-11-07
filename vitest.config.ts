import path from 'node:path'
import { env } from 'node:process'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: './',
  resolve: {
    alias: {
      '#shared': path.resolve(__dirname, './shared'),
      '@@': path.resolve(__dirname, './'),
    },
  },
  test: {
    include: ['**/*.test.?(c|m)[jt]s?(x)'],
    reporters: process.env.CI ? 'junit' : 'default',
    outputFile: 'test-report.junit.xml',
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: env.CI ? ['lcov', 'text'] : ['html'],
      extension: ['.js', '.cjs', '.mjs', '.ts', '.mts', '.tsx', '.jsx'],
      exclude: [
        '.nuxt',
        '.happo.mjs',
        '.prettierrc.mjs',
        '.stylelintrc.mjs',
        '*.config.*',
        'test/',
      ],
    },
  },
})
