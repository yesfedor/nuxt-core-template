<template>
  <NuxtLayout>
    <pre>
      {{ error.message }}
    </pre>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const error = useError()
</script>
