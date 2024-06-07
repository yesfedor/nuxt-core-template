<template>
	<div class="app-root app-root--error">
		<nuxt-pwa-manifest />

		<nuxt-layout name="default">
			<pre v-if="error">
        {{ error.message }}
      </pre>
		</nuxt-layout>

		<core-scope />
	</div>
</template>

<script lang="ts" setup>
const error = useError()
</script>
