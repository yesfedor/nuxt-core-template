<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="toggleNavbar" />
    <v-app-bar-title>Entity Title</v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp()

function toggleNavbar() {
  nuxtApp.$bus.emit('app:navigation-drawer:toggle')
}
</script>
