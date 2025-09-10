import js from '@eslint/js'
import withNuxt from './.nuxt/eslint.config.mjs'
import standard from 'eslint-config-standard'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import nodePlugin from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import vitest from '@vitest/eslint-plugin'

export default withNuxt([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  { plugins: { n: nodePlugin } },
  pluginPromise.configs['flat/recommended'],
  js.configs.recommended,
  { rules: standard.rules },
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-nested-ternary': 'error',
    },
  },
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules,
    },
  },
])
