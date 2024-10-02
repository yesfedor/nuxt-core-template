<script lang="ts" setup>
interface Props {
  /** The name of the user */
  name?: string
}

const props = defineProps<Props>()

provide(props.name, {
  scope: {},
})
</script>

<template>
  <section class="app-common-scope">
    <nuxt-loading-indicator
      :throttle="0"
      :duration="5e3"
    />
  </section>
</template>
