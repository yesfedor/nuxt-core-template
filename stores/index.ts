import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', {
  state: () => {
    return {
      appConfig: {},
    }
  },
  actions: {
    async initializationGlobal() {
      useConsole().info('globalStore', 'init')
    },
    async initializationServerOnly() {
      useConsole().info('globalStore', 'server init')
    },
    async initializationClientOnly() {
      useConsole().info('globalStore', 'client init')
    },
  },
})
