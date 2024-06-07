<template>
	<layout-provider>
		<v-app>
			<layout-base-system-bar />

			<client-only>
				<layout-base-navigation />
			</client-only>

			<layout-base-header />

			<v-main>
				<v-divider />

				<v-row key="page">
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
