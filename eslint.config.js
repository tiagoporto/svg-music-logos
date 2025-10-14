import tpConfig from '@tiagoporto/eslint-config'
import vitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'
import playwright from 'eslint-plugin-playwright'
import pluginVue from 'eslint-plugin-vue'

import eslintWithNuxt from './.nuxt/eslint.config.mjs'

export default eslintWithNuxt(
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
        '**/*.md',
        '**/*.json',
      ],
    },

    ...pluginVue.configs['flat/recommended'],
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    skipFormatting,
    ...tpConfig.configs.base,
    {
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'unicorn/no-null': 'off',
        'unicorn/filename-case': 'off',
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
  ]),
)
