<script lang="ts" setup>
const error = useError()
</script>

<template>
  <div class="app-root app-root--error">
    <nuxt-route-announcer />
    <vite-pwa-manifest />

    <nuxt-layout name="default">
      <pre
        v-if="error"
        style="white-space: pre-line;"
      >
        [VueRouterError]: {{ error.message }}
      </pre>
    </nuxt-layout>

    <core-scope />
  </div>
</template>
