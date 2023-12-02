import viteConfig from './configs/vite.config'
import headConfig from './configs/head.config'
import experimentalConfig from './configs/experimental.config'

export default defineNuxtConfig({
  // https://nuxt.com/docs/api/configuration/nuxt-config
  runtimeConfig: {
    public: {},
  },
  css: ['~/assets/stylesheets/main.scss'],
  ssr: true,
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
  ],
  components: {
    dirs: [
      {
        prefix: 'App',
        path: '~/components',
        pathPrefix: true,
      },
    ],
  },
  postcss: {
    plugins: {
      cssnano: { preset: 'default' },
      autoprefixer: {
        cascade: false,
      },
    },
  },
  experimental: experimentalConfig,
  devtools: {
    enabled: false,
  },
  devServer: {
    host: '0.0.0.0',
    port: 3210,
  },
  pwa: {
    strategies: 'generateSW',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  i18n: {
    vueI18n: './configs/i18n.config.ts',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    locales: [
      {
        code: 'en',
        file: 'en.ts',
      },
    ],
    experimental: {
      jsTsFormatResource: true,
    },
  },
  app: {
    head: headConfig,
  },
  vite: viteConfig,
})
