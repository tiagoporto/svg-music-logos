import tpConfig from '@tiagoporto/eslint-config'
import { typescriptConfig } from '@tiagoporto/eslint-config/typescript'
import vitest from '@vitest/eslint-plugin'
import playwright from 'eslint-plugin-playwright'
import pluginVue from 'eslint-plugin-vue'
import typescriptEslint from 'typescript-eslint'

import eslintWithNuxt from './.nuxt/eslint.config.mjs'

const vueConfig = typescriptEslint.config([
  {
    files: ['**/*.vue'],
    extends: [
      // TODO: export separated configs
      ...typescriptConfig,
      ...pluginVue.configs['flat/recommended'],
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 3,
        },
      }],
      'unicorn/filename-case': 'off',
    },
  },
])

const nuxt = await eslintWithNuxt()
const nuxtConfig = nuxt.toSpliced(2, 1)

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    name: 'app/files-to-ignore',
    ignores: ['**/coverage/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  ...vueConfig,
  ...nuxtConfig,
  ...tpConfig.configs.base,
  {
    files: ['**/*.ts'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [
            /^\[.*].*\.ts$/,
          ],
        },
      ],
    },
  },
  // TODO: move rule to tpconfig
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      '@stylistic/operator-linebreak': [
        'error',
        'after',
        { overrides: {
          '?': 'before',
          ':': 'before',
          '|': 'before',
        } },
      ],
      'vue/require-default-prop': 'off',
      // TODO: fix rules
      'vue/no-multiple-template-root': 'off',
      'unicorn/no-null': 'off',
    },
  },
  {
    files: ['**/*.test.js'],
    plugins: { vitest },
    rules: { ...vitest.configs.all.rules },
  },
  {
    files: ['**/*.test.ts'],
    plugins: { vitest },
    rules: { ...vitest.configs.all.rules },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['test/e2e/**/*.spec.{js,ts}'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  },
]
