<script setup lang="ts">

</script>

<template>
  <layout-provider>
		<v-app>
			<layout-base-system-bar />

			<client-only>
				<layout-base-aside />
				<layout-base-header />
			</client-only>

			<v-main>
				<v-divider />
				<slot />
			</v-main>
		</v-app>
  </layout-provider>
</template>
