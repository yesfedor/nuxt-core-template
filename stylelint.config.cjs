module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  overrides: [
    {
      'files': ['*.scss', '*.vue', '**/*.vue'],
      'rules': {
        'at-rule-empty-line-before': 'off',
      },
    },
  ],
}
