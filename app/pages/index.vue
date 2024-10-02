<script lang="ts" setup>
const nuxtApp = useNuxtApp()

const baseUrl = ref(nuxtApp.$config.public.BASE_URL)
const nuxtVersion = ref(nuxtApp.versions.nuxt)

// example use auto import api folder
const { first } = await useCatCatalog()

const localePath = useLocalePath()
</script>

<template>
  <div class="app-page-home">
    <h1 class="app-page-home__title">
      {{ $t('welcome') }}
    </h1>

    <ui-icon
      name="reorder"
      filled
    />

    <p>This is production: Nuxt Core Template v{{ nuxtVersion }}</p>

    <p>Host: {{ baseUrl }}</p>

    <template v-if="first?.id">
      <p>Your unique cat</p>
      <img
        :src="first.url"
        :alt="first.id"
        class="app-page-home__cat"
      >
    </template>

    <p class="app-page-home__me-1">
      <span>Second page (test navigate):</span>
      <nuxt-link :to="localePath({ name: 'about' })">/about</nuxt-link>
    </p>
  </div>
</template>

<style lang="scss">
.app-page-home {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__title {
    color: #00dc82;
  }

  &__cat {
    max-width: 50vw;
    max-height: 50vh;
    object-fit: cover;
  }

  &__me-1 {
    margin-right: 1rem;
  }
}
</style>
