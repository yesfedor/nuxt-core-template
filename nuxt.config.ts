import viteConfig from './configs/vite.config'
import headConfig from './configs/head.config'
import i18nConfig from './configs/i18n.config'

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
  devtools: {
    enabled: true,
  },
  devServer: {
    host: '0.0.0.0',
    port: 3210,
  },
  pwa: {},
  pinia: {
    storesDirs: ['./stores/**'],
  },
  i18n: {
    vueI18n: './configs/i18n.config.ts',
  },
  app: {
    head: headConfig,
  },
  vite: viteConfig,
})
