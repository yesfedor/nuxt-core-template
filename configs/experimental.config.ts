import type { NuxtOptions } from '@nuxt/schema'

export default <Partial<NuxtOptions['experimental']>>{
	asyncContext: true,
	asyncEntry: true,
	inlineSSRStyles: false,
	payloadExtraction: false,
}
