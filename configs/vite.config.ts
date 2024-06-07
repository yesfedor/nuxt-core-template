import type { NuxtOptions } from '@nuxt/schema'
import { transformAssetUrls } from 'vite-plugin-vuetify'

export default <Partial<NuxtOptions['vite']>> {
	build: {
		assetsDir: 'static/',
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "~/assets/stylesheets/additional.scss" as *;',
			},
		},
	},
	server: {
		watch: {
			usePolling: true,
		},
		hmr: {
			protocol: 'ws',
			host: '0.0.0.0',
		},
	},
	vue: {
		template: {
			transformAssetUrls,
		},
	},
}
