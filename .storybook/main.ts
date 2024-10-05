import type { StorybookConfig } from '@storybook-vue/nuxt'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../app/**/*.mdx',
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../layers/**/*.mdx',
    '../layers/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../server/**/*.mdx',
    '../server/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../shared/**/*.mdx',
    '../shared/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {
      docgen: 'vue-component-meta',
    },
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config
