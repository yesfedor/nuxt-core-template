// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
	antfu({
		extends: ['@antfu/eslint-config/rules'],
		vue: true,
		typescript: true,
		gitignore: true,
		toml: false,
		yaml: false,
		formatters: {
			css: true,
			html: true,
			markdown: true,
		},
		stylistic: {
			indent: 2,
			quotes: 'single',
		},
		// ...@antfu/eslint-config options
	}, {
		files: ['**/*.ts', '**/*.vue'],
		rules: {
			'curly': ['warn', 'all'],
			'dot-notation': 'error',
			'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
			'no-lonely-if': 'error',
			'no-useless-rename': 'error',
			'node/prefer-global/process': 'off',
			'object-shorthand': 'error',
			'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
			'require-await': 'error',
			'sort-imports': ['error', { ignoreDeclarationSort: true }],
			'style/arrow-parens': [1, 'always'],
			'style/brace-style': ['warn', '1tbs'], // No single if in an "else" block
			'style/yield-star-spacing': 'off',
			'ts/consistent-type-definitions': 'off',
			'unicorn/prefer-node-protocol': 'off',
			'unused-imports/no-unused-vars': 'off',
			'vue/block-order': ['error', {
				order: [['template', 'script'], 'style'],
			}],
		},
	}),
	// ...your other rules
)
