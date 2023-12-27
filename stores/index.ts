import { defineStore } from 'pinia'
import { consola } from 'consola'

export const useGlobalStore = defineStore('globalStore', {
  state: () => {
    return {
      appConfig: {},
    }
  },
  actions: {
    initializationGlobal() {
      // get runtimeConfig from be-side, and basic info for header, footer, left menu
      consola.info('[globalStore]: init')
    },
    initializationServerOnly() {
      consola.info('[globalStore]: server init')
    },
    initializationClientOnly() {
      // get user data & check auth & validate tokens
      consola.info('[globalStore]: client init')
    },
  },
})
