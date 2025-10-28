import tpConfig from '@tiagoporto/eslint-config'
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
      tpConfig.configs.base[18],
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

// console.log('vueConfig: ', vueConfig);
const nuxt = await eslintWithNuxt()

const nuxtConfig = [
  // .gitignore
  nuxt[0],
  // ignore
  nuxt[1],
  // nuxt/typescript/setup
  nuxt[3],
  // nuxt/typescript/rules
  nuxt[4],
  // nuxt/vue/setup
  nuxt[5],
  // nuxt/vue/rules
  nuxt[6],
  // nuxt/import/rules
  nuxt[7],
  // nuxt/setup
  nuxt[8],
  // nuxt/vue/single-root
  nuxt[9],
  // nuxt/rules
  nuxt[10],
  // nuxt/disables/routes
  nuxt[11],
  // nuxt/import-globals
  nuxt[12],
]

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    name: 'app/files-to-ignore',
    ignores: ['**/coverage/**'],
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
    files: ['**/*.test.{js,ts}'],
    plugins: { vitest },
    rules: { ...vitest.configs.all.rules },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  },
]
