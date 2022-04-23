<template>
  <div class="NoteSearchList">
    <!-- id for E2E test -->
    <input id="searchInput" v-focus :value="modelValue" type="search" class="p-2 w-full outline-none border-b focus:border-cyan-900 text-sm" placeholder="search" @input="onInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NoteSearchList',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    return {
      onInput(event: Event) {
        event.target instanceof HTMLInputElement && emit('update:modelValue', event.target.value)
      }
    }
  }
})
</script>
