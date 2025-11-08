import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
  features: {
    stylistic: true,
    tooling: true,
    typescript: true,
    nuxt: {
      sortConfigKeys: true,
    },
  },
}).append({
  rules: {
    '@stylistic/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    '@stylistic/semi': ['error', 'never'],
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/html-self-closing': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'vue/ multi-word-component-names': 'off',
  },
}, {
  ignores: [
    'shell/*.ts',
  ],
})
