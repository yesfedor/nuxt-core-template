import { defineNuxtConfig } from 'nuxt/config'

import headConfig from './configs/head.config'
import experimentalConfig from './configs/experimental.config'
import viteConfig from './configs/vite.config'

export default defineNuxtConfig({
  // https://nuxt.com/docs/api/configuration/nuxt-config
  app: {
    head: headConfig,
  },
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
  experimental: experimentalConfig,
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
  modules: [
    // https://github.com/nuxt-modules/stylelint
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
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  postcss: {
    plugins: {
      cssnano: { preset: 'default' },
      autoprefixer: {
        cascade: false,
      },
    },
  },
  pwa: {
    strategies: 'generateSW',
  },
  runtimeConfig: {
    public: {
      APP_DEBUG: Boolean(process.env.APP_DEBUG),
      APP_IS_PROD: Boolean(process.env.APP_IS_PROD),
      BASE_URL: String(process.env.BASE_URL),
      DEBUG: Boolean(process.env.DEBUG),
      NUXT_SSR: Boolean(process.env.NUXT_SSR),
    },
  },
  ssr: Boolean(process.env.NUXT_SSR),
  vite: viteConfig,
})
