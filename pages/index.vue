<template>
  <div class="app-page-home">
    <h1 class="app-page-home__title">
      {{ $t('welcome') }}
    </h1>
    <nuxt-icon name="reorder" filled />
    <p>This will be merged into the master.</p>
    <p>This is production: Nuxt Core Template v3.9.0</p>
    <p>Host: {{ baseUrl }}</p>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default',
})

const config = useRuntimeConfig()
const baseUrl = ref(config.public.BASE_URL)
</script>

<style lang="scss">
.app-page-home {
  &__title {
    color: dodgerblue;
  }
}
</style>
