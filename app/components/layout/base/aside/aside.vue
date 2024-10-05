<template>
  <v-navigation-drawer
    v-model="drawer"
    :scrim="false"
    width="255"
    elevation="0"
  >
    <v-list class="h-100">
      <v-list-item>
        <b class="d-block text-truncate">Username</b>
        <span class="d-block text-truncate">mail@example.com</span>
      </v-list-item>
      <v-divider />
      <v-list-item
        v-for="[icon, text] in links"
        :key="icon"
        :prepend-icon="icon"
        :title="text"
        link
      />
      <v-list-item
        class="mt-auto"
        title="Logout"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp()

const drawer = ref(false)

function toggleHandler() {
  drawer.value = !drawer.value
}

const links = [
  ['mdi-inbox-arrow-down', 'Inbox'],
  ['mdi-send', 'Send'],
  ['mdi-delete', 'Trash'],
  ['mdi-alert-octagon', 'Spam'],
]

onBeforeMount(() => {
  drawer.value = true
})

onMounted(() => {
  nuxtApp.$bus.on('app:navigation-drawer:toggle', toggleHandler)
})

onUnmounted(() => {
  nuxtApp.$bus.off('app:navigation-drawer:toggle', toggleHandler)
})
</script>
