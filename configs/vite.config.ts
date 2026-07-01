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
    include: [
      'mitt',
      'es-toolkit',
    ],
  },
  server: {
    hmr: {
      protocol: 'ws',
      host: process.env.HOST || '0.0.0.0',
    },
  },
}
