<template>
  <div class="app-page-home">
    <h1 class="app-page-home__title">
      {{ $t('welcome') }}
    </h1>
    <nuxt-icon name="reorder" filled />
    <p>This will be merged into the master. Attempt: 8</p>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default',
})
</script>

<style lang="scss">
.app-page-home {
  &__title {
    color: dodgerblue;
  }
}
</style>
