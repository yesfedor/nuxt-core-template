<template>
  <v-system-bar class="grey-lighten-4 px-5">
    <v-icon
      class="pe-5"
      icon="mdi-circle"
    />
    <strong>Dashboard</strong>

    <v-spacer />

    <div class="cursor-pointer px-5">
      <span>{{ date }}</span>
      <v-overlay
        activator="parent"
        location-strategy="connected"
        scroll-strategy="close"
      >
        <v-date-picker :title="`Today: ${date}`" />
      </v-overlay>
    </div>
    <v-icon class="cursor-pointer grey-darken-4">mdi-square</v-icon>
    <v-icon class="cursor-pointer grey-darken-4 mx-1">mdi-circle</v-icon>
    <v-icon class="cursor-pointer grey-darken-4">mdi-triangle</v-icon>
  </v-system-bar>
</template>

<script lang="ts" setup>
import moment from 'moment'

const timerId = ref<NodeJS.Timeout>()
const time = ref(Date.now())

const date = computed(() => {
  return moment(time.value).format('Do, hh:mm A')
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
