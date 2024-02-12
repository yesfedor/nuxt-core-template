export default defineNuxtPlugin({
  name: 'app:initialization',
  dependsOn: ['app:eventBus'],

  async setup({ $config }) {
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
    if (!$config.public.NUXT_SSR) {
      await initializationServerOnly()
    }

    // app:client
    await useClientOnlyAsync(initializationClientOnly)
  },
})
