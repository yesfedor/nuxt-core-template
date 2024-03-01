<template>
  <layout-provider v-slot="{ contentClasses }">
    <div class="app-layout app-layout--default">
      <div :class="contentClasses" class="app-layout__content">
        <slot />
      </div>
    </div>
  </layout-provider>
</template>

<script setup lang="ts">

</script>
