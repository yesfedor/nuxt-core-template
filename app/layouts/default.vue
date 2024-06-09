<template>
	<layout-provider>
		<v-app key="v-app">
			<layout-base-system-bar />

			<client-only>
				<layout-base-aside />
			</client-only>

			<layout-base-header />

			<v-main key="v-main">
				<v-divider />

				<v-row>
					<v-col class="mt-5">
						<slot />
					</v-col>
				</v-row>
			</v-main>
		</v-app>
	</layout-provider>
</template>

<script setup lang="ts">

</script>
