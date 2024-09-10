<script setup lang="ts">

</script>

<template>
  <div class="app-root">
    <nuxt-route-announcer />

    <nuxt-layout fallback="default">
      <nuxt-page />
    </nuxt-layout>

    <core-scope />
  </div>
</template>
