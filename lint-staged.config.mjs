export default {
  '*': 'prettier --check --ignore-unknown --write',
  '*.md': 'remark --frail',
  '*.{ts,tsx, vue}': () => 'vue-tsc --project tsconfig.json',
  '*.{js,jsx,ts,tsx,vue}': ['eslint --max-warnings 0'],
  '*.{scss,vue}': ['stylelint --fix'],
}
