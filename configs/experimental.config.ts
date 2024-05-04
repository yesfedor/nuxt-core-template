import type { NuxtOptions } from '@nuxt/schema'

export default <Partial<NuxtOptions['experimental']>> {
	inlineSSRStyles: false,
	payloadExtraction: false,
}
