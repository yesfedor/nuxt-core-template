<script setup lang="ts">

</script>

<template>
  <layout-provider>
    <v-app>
      <layout-base-system-bar />

      <layout-base-aside />
      <layout-base-header />

      <v-main>
        <v-divider />
        <slot />
      </v-main>
    </v-app>
  </layout-provider>
</template>
