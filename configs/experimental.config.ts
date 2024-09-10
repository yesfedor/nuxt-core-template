import type { NuxtOptions } from '@nuxt/schema'

export default <Partial<NuxtOptions['experimental']>>{
  asyncContext: true,
  asyncEntry: true,
  componentIslands: true,
  inlineSSRStyles: false,
  payloadExtraction: true,
  sharedPrerenderData: true,
}
