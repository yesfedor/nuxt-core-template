import type { StorybookConfig } from '@storybook-vue/nuxt'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  addons: [
    // '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
  ],

  core: {
    builder: '@storybook/builder-vite',
  },

  features: {
    experimentalRSC: true,
  },

  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },

  staticDirs: ['../public', '../app/assets'],

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

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {},
      },
    })
  },
}

export default config
