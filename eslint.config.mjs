import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
  features: {
    stylistic: true,
    tooling: true,
    typescript: true,
    nuxt: {
      sortConfigKeys: true,
    },
  },
})
