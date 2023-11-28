import { defineNuxtPlugin } from '#app'
import { useGlobalStore } from '~/stores'

export default defineNuxtPlugin(() => {
  // deps
  const globalStore = useGlobalStore()

  function initializationGlobal() {
    globalStore.initializationGlobal()
  }

  function initializationServerOnly() {
    globalStore.initializationServerOnly()
  }

  function initializationClientOnly() {
    globalStore.initializationClientOnly()
  }

  function initializationFinish() {
    globalStore.initializationFinish()
    return {}
  }

  // app:global
  initializationGlobal()
  // app:server
  useServerOnly(initializationServerOnly)
  // app:client
  useClientOnly(initializationClientOnly)

  return {
    provide: initializationFinish(),
  }
})
