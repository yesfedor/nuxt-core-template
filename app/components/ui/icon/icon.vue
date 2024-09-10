<script lang="ts" setup>
import type { TUiIconNames } from '#build/types/ui-icon'

interface Props {
  name: TUiIconNames
  filled?: boolean
  size?: number
}

const props = withDefaults(defineProps<Props>(), { filled: false, size: 16 })
const { filled, size } = toRefs(props)

const customStyle = computed(() => {
  if (!size.value) {
    return {}
  }
  return {
    fontSize: `${size.value}px`,
  }
})
</script>

<template>
  <nuxt-icon
    v-if="name"
    :name="name"
    :filled="filled"
    :style="customStyle"
    class="ui-icon"
  />
</template>

<style lang="scss">
.ui-icon {
  &.nuxt-icon svg {
    margin-bottom: 0;
    width: 1em;
    height: 1em;
  }
}
</style>
