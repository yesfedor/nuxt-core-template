module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'filename-rules',
    'no-relative-path',
  ],
  rules: {
    // Base
    semi: ['error', 'never'],
    quotes: [2, 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],
    'comma-dangle': ['warn', 'always-multiline'],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-empty': 'off',
    'no-unused-vars': ['warn', {
      'caughtErrors': 'none',
      'args': 'after-used',
      'vars': 'local',
    }],
    'no-multiple-empty-lines': 'error',
    'arrow-parens': ['warn', 'as-needed'],
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'never', {
      singleValue: false,
      objectsInArrays: true,
      arraysInArrays: true,
    }],

    // Typescript
    '@typescript-eslint/no-unused-vars': 'warn',

    // Vue / Nuxt
    'vue/no-v-html': 'warn',
    'vue/multi-word-component-names': ['error', {
      ignores: ['error', 'default', 'minimal', 'index', 'main', 'slug', 'id', 'app'],
    }],
    'vue/attribute-hyphenation': 'warn',
    'vue/attributes-order': 'warn',
    'vue/max-attributes-per-line': 'warn',
    'vue/order-in-components': 'warn',
    'vue/prop-name-casing': 'warn',
    'vue/no-dupe-keys': ['error', {
      groups: [],
    }],
    'vue/no-multiple-template-root': 'warn',

    // Others
    'filename-rules/match': 'off',
    'no-relative-path/no-relative-path': 2,
  },
}
