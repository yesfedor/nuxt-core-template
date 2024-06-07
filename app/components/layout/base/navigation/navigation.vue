<template>
	<v-navigation-drawer v-model="drawer" persistent>
		<v-list>
			<v-list-item
				v-for="[icon, text] in links"
				:key="icon"
				:prepend-icon="icon"
				:title="text"
				link
			/>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp()

const drawer = ref(true)

function toggleHandler() {
	drawer.value = !drawer.value
}

const links = [
	['mdi-inbox-arrow-down', 'Inbox'],
	['mdi-send', 'Send'],
	['mdi-delete', 'Trash'],
	['mdi-alert-octagon', 'Spam'],
]

onMounted(() => {
	nuxtApp.$bus.on('app:navigation-drawer:toggle', toggleHandler)
})

onUnmounted(() => {
	nuxtApp.$bus.off('app:navigation-drawer:toggle', toggleHandler)
})
</script>
