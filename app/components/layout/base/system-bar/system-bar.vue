<template>
	<v-system-bar class="grey-lighten-4 px-5">
		<span>Hello, <strong>username</strong></span>
		<v-spacer />
		<span class="px-5">{{ date }}</span>
		<v-icon class="grey-darken-4">mdi-square</v-icon>
		<v-icon class="grey-darken-4">mdi-circle</v-icon>
		<v-icon class="grey-darken-4">mdi-triangle</v-icon>
	</v-system-bar>
</template>

<script lang="ts" setup>
import moment from 'moment'

const timerId = ref<NodeJS.Timeout>()
const time = ref(Date.now())

const date = computed(() => {
	return moment(time.value).format('dddd, hh:mm')
})

function updateTime() {
	time.value = Date.now()
}

onMounted(() => {
	timerId.value = setInterval(updateTime, 1000 * 2)
})

onUnmounted(() => {
	clearInterval(timerId.value)
})
</script>
