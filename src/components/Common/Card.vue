<template>
  <div class="Card bg-white border rounded-lg p-6 shadow-sm">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card'
})
</script>

<style lang="scss" scoped></style>
