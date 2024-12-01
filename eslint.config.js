import js from '@eslint/js'
import withNuxt from './.nuxt/eslint.config.mjs'
import standard from 'eslint-config-standard'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import nodePlugin from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'

export default withNuxt([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/dump/**'],
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
    },
  },
])
