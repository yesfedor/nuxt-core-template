import { defineNuxtPlugin } from '#app'
import { useGlobalStore } from '~/stores'
import { useServerOnlyAsync } from '~/composables/useServerOnly'
import { useClientOnlyAsync } from '~/composables/useClientOnly'

export default defineNuxtPlugin(async () => {
  // deps
  const globalStore = useGlobalStore()

  async function initializationGlobal() {
    globalStore.initializationGlobal()
  }

  async function initializationServerOnly() {
    globalStore.initializationServerOnly()
  }

  async function initializationClientOnly() {
    globalStore.initializationClientOnly()
  }

  // app:global
  await initializationGlobal()
  // app:server
  await useServerOnlyAsync(initializationServerOnly)
  // app:client
  await useClientOnlyAsync(initializationClientOnly)
})
