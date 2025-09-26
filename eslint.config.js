import js from '@eslint/js'
import tpConfig from '@tiagoporto/eslint-config'
import vitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'
import playwright from 'eslint-plugin-playwright'
import pluginVue from 'eslint-plugin-vue'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  defineConfigWithVueTs([
    {
      name: 'app/files-to-lint',
      files: ['**/*.{js,ts,mts,tsx,vue}'],
    },

    {
      name: 'app/files-to-ignore',
      ignores: [
        '**/dist/**',
        '**/dist-ssr/**',
        '**/coverage/**',
        '**/*.svg',
        '**/*.md',
        '**/*.json',
        '**/*.yml',
        '**/*.yaml',
        'package-lock.json',
      ],
    },

    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    skipFormatting,
    ...tpConfig.configs.base,
    {
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        'no-nested-ternary': 'error',
        'unicorn/no-null': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'no-secrets/no-secrets': 'off',
        'no-unsafe-optional-chaining': 'warn',
      },
    },

    {
      files: ['**/*.test.js'],
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
  ]),
)
