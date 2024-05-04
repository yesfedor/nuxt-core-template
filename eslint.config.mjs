// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    typescript: true,
    vue: true,
    stylistic: {
      indent: 'tab',
      quotes: 'single',
    },
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },
    // ...@antfu/eslint-config options
  }, {
    rules: {
      'sort-imports': 'off',
      'import/order': 'off',
      'curly': ['warn', 'all'],
      'no-throw-literal': 'off',
      'style/arrow-parens': [1, 'always'],
      'style/yield-star-spacing': 'off',
      'node/prefer-global/process': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'style/brace-style': ['warn', '1tbs'],
      'ts/consistent-type-definitions': 'off',
      'vue/block-order': ['error', {
        'order': [['template', 'script'], 'style'],
      }],
    },
  }),
  // ...your other rules
)
