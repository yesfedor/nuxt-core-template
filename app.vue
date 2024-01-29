<template>
  <div class="app-root">
    <NuxtPwaManifest />

    <NuxtLayout fallback="default">
      <NuxtPage />
    </NuxtLayout>

    <CommonScope />
  </div>
</template>

<script setup lang="ts">

</script>
