import { defineNuxtConfig } from 'nuxt/config'

import vuetify from 'vite-plugin-vuetify'

import experimentalConfig from './configs/experimental.config'
import headConfig from './configs/head.config'
import pwaConfig from './configs/pwa.config'

import viteConfig from './configs/vite.config'

export default defineNuxtConfig({
  // https://nuxt.com/docs/api/configuration/nuxt-config
  app: {
    head: headConfig,
  },

  build: {
    transpile: [
      'vuetify',
    ],
  },

  compatibilityDate: '2024-09-09',

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: true,
      },
    ],
  },

  css: [
    '~/assets/stylesheets/main.scss',
  ],

  devServer: {
    host: String(process.env.NITRO_DEV_HOST) || '0.0.0.0',
    port: Number(process.env.NITRO_DEV_PORT) || 3000,
  },

  devtools: {
    enabled: Boolean(process.env.APP_DEVTOOLS),
  },

  dir: {
    public: './public',
  },

  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
    checker: true,
  },

  experimental: experimentalConfig,

  future: {
    compatibilityVersion: 4,
  },

  i18n: {
    defaultLocale: 'en',
    detectBrowserLanguage: {
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      useCookie: true,
    },
    langDir: 'locales',
    lazy: true,
    locales: [
      {
        code: 'en',
        file: 'en.ts',
      },
    ],
    strategy: 'prefix_except_default',
    vueI18n: './configs/i18n.config.ts',
  },

  imports: {
    dirs: [
      './api/**',
      './composables/**',
      './utils/**',
      '../shared/**',
    ],
  },

  modules: [
    // https://eslint.nuxt.com/packages/module
    '@nuxt/eslint',
    // https://nuxt.com/modules/stylelint
    '@nuxtjs/stylelint-module',
    // https://nuxt.com/modules/pinia
    '@pinia/nuxt',
    // https://nuxt.com/modules/vite-pwa-nuxt
    // https://vite-pwa-org.netlify.app/frameworks/nuxt.html#vitepwamanifest-nuxtpwamanifest-in-app-vue
    '@vite-pwa/nuxt',
    // https://nuxt.com/modules/vee-validate
    '@vee-validate/nuxt',
    // https://nuxt.com/modules/icons
    'nuxt-icons',
    // https://v8.i18n.nuxtjs.org/options/vue-i18n
    '@nuxtjs/i18n',
    // https://nuxt.com/modules/device
    '@nuxtjs/device',
    // https://storybook.nuxtjs.org/getting-started/setup
    '@nuxtjs/storybook',
    // https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({
          autoImport: true,
        }))
      })
    },
  ],

  nitro: {
    prerender: {
      routes: ['/offline'],
    },
  },

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  pwa: pwaConfig,

  runtimeConfig: {
    public: {
      APP_DEBUG: Boolean(process.env.APP_DEBUG),
      APP_IS_PROD: Boolean(process.env.APP_IS_PROD),
      BASE_URL: String(process.env.BASE_URL),
      DEBUG: Boolean(process.env.DEBUG),
      NUXT_SSR: Boolean(process.env.NUXT_SSR),
    },
  },

  srcDir: './app',

  ssr: Boolean(process.env.NUXT_SSR),
  storybook: {
    route: '/_storybook',
    port: Number(process.env.STORYBOOK_PORT || 8081),
  },
  stylelint: {},
  vite: viteConfig,
})
