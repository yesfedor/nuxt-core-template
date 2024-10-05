import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    type: 'app',
    extends: [
      '@antfu/eslint-config/rules',
    ],
    vue: true,
    typescript: true,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    env: {
      node: true,
      es6: true,
      browser: true,
    },
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
    rules: {
      // code quality
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-empty-function': 'warn',

      // For Vue
      'vue/block-order': ['error', {
        order: [['template', 'script'], 'style'],
      }],
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/no-unused-vars': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/no-deprecated-slot-attribute': 'error',
      'vue/no-deprecated-scope-attribute': 'error',
      'vue/no-shared-component-data': 'error',
      'vue/no-side-effects-in-computed-properties': 'error',
      'vue/no-unused-components': 'error',
      'vue/no-useless-template-attributes': 'error',
      'vue/order-in-components': ['error', {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'methods',
          'lifecycle',
          'render',
          'template',
        ],
      }],
      'vue/require-prop-types': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-dupe-keys': 'error',
      'vue/no-duplicate-attributes': 'error',
      'vue/no-template-key': 'error',
      'vue/no-useless-mustaches': 'error',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-indent': ['error', 2],
      'vue/script-indent': ['error', 2],
      'vue/v-on-function-call': 'error',
      'vue/valid-v-slot': 'error',
      'vue/no-unsupported-features': ['error', {
        version: '3.x',
      }],

      // style
      'style/member-delimiter-style': 'off',
      'style/semi': ['error', 'never'],

      // node
      'node/prefer-global/process': 'off',

      // project
      'curly': ['warn', 'all'],
      'dot-notation': 'error',
    },
    overrides: [],
  }),
)

