import { defineNuxtPlugin } from '#app'
import { useGlobalStore } from '~/stores'
import { useServerOnlyAsync } from '~/composables/useServerOnly'
import { useClientOnlyAsync } from '~/composables/useClientOnly'

export default defineNuxtPlugin(async (nuxtApp) => {
  // deps
  const globalStore = useGlobalStore()

  async function initializationGlobal() {
    await globalStore.initializationGlobal()
  }

  async function initializationServerOnly() {
    await globalStore.initializationServerOnly()
  }

  async function initializationClientOnly() {
    await globalStore.initializationClientOnly()
  }

  // app:global
  await initializationGlobal()

  // app:server
  await useServerOnlyAsync(initializationServerOnly)
  if (!nuxtApp.$config.public.NUXT_SSR) {
    await initializationServerOnly()
  }

  // app:client
  await useClientOnlyAsync(initializationClientOnly)
})
