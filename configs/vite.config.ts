import type { NuxtOptions } from '@nuxt/schema'

export default <Partial<NuxtOptions['vite']>> {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "~/assets/stylesheets/additional.scss" as *;
        `,
      },
    },
  },
  optimizeDeps: {
    include: ['jsdoc-type-pratt-parser'],
  },
  server: {
    watch: {
      usePolling: true,
    },
    hmr: {
      protocol: 'ws',
      host: String(process.env.HOST) || '0.0.0.0',
    },
  },
}
