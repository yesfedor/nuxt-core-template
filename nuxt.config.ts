import viteConfig from './configs/vite.config'
import headConfig from './configs/head.config'

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
  ],
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
  app: {
    head: headConfig,
  },
  vite: viteConfig,
})
