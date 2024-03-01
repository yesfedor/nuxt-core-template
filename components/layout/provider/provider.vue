<template>
  <div class="app-layout-provider">
    <slot :content-classes="contentClasses" />
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const contentClasses = computed(() => {
  const pageName = `--${String(router.currentRoute.value.name)}`.split('__')[0]
  return {
    [pageName]: true,
  }
})
</script>
