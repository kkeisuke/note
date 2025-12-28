<template>
  <button :disabled="disabled || loading" class="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors">
    <slot v-if="!loading" />
    <template v-else>{{ loadingText }}</template>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: 'Loading...'
    }
  }
})
</script>

<style lang="scss" scoped></style>
