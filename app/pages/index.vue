<template>
	<div class="app-page-home">
		<h1 class="app-page-home__title">
			{{ $t('welcome') }}
		</h1>

		<ui-icon name="reorder" filled />

		<p>This is production: Nuxt Core Template v3.11.2</p>

		<p>Host: {{ baseUrl }}</p>

		<template v-if="firstCat?.id">
			<p>Your unique cat</p>
			<img :src="firstCat.url" :alt="firstCat.id" class="app-page-home__cat">
		</template>
	</div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const baseUrl = ref(config.public.BASE_URL)

// example use auto import api folder
const cats = await useAsyncData('api:cats', async () => await apiGetImageFromTheCatApi())
const firstCat = computed(() => cats.data.value ? cats.data.value[0] : null)
</script>

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
}
</style>
