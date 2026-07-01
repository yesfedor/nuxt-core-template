export const useGlobalStore = defineStore('globalStore', () => {
  const globalConfig = ref({})

  async function initializationGlobal() {
    useConsole().info('globalStore', 'init')
  }

  async function initializationServerOnly() {
    useConsole().info('globalStore', 'server init')
  }

  async function initializationClientOnly() {
    useConsole().info('globalStore', 'client init')
  }

  return {
    globalConfig,
    initializationGlobal,
    initializationServerOnly,
    initializationClientOnly,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
