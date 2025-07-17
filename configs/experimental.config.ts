import type { NuxtOptions } from '@nuxt/schema'

export default <Partial<NuxtOptions['experimental']>>{
  asyncContext: true,
  asyncEntry: true,
  componentIslands: true,
  payloadExtraction: true,
  sharedPrerenderData: true,
  typedPages: true,
}
