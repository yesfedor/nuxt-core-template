<template>
	<nuxt-icon
		v-if="name"
		class="ui-icon"
		:name="name"
		:filled="filled"
		:style="customStyle"
	/>
</template>

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

<style lang="scss">
.ui-icon {
	&.nuxt-icon svg {
		margin-bottom: 0;
		width: 1em;
		height: 1em;
	}
}
</style>
