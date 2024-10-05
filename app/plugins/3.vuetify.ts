import { createVuetify } from 'vuetify'

export default defineNuxtPlugin({
  name: 'ui:vuetify',

  async setup(nuxtApp) {
    const vuetify = createVuetify({
      ssr: true,
    })
    nuxtApp.vueApp.use(vuetify)
  },
})
