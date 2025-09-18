import js from '@eslint/js'
import withNuxt from './.nuxt/eslint.config.mjs'
import pluginVue from 'eslint-plugin-vue'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import vitest from '@vitest/eslint-plugin'

export default withNuxt(
  defineConfigWithVueTs([
    {
      name: 'app/files-to-lint',
      files: ['**/*.{js,ts,mts,tsx,vue}'],
    },

    {
      name: 'app/files-to-ignore',
      ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    },
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
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
  ]),
)
