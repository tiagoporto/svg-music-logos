export default {
  '*': 'prettier --check --ignore-unknown --write',
  '*.{md,markdown,mdx}': [
    'remark --frail',
    // 'eslint --max-warnings 0 --no-warn-ignored'
  ],
  // '*.{html,yml,json,jsonc,json5}': 'eslint --max-warnings 0 --no-warn-ignored',
  '*.{ts,tsx,vue}': () => 'vue-tsc --project tsconfig.json',
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}': [
    'eslint --max-warnings 0',
    'vitest related --run --passWithNoTests',
  ],
  '*.{scss,vue}': ['stylelint --fix'],
}
