<template>
  <h1 class="NoteHeader bg-gray-700 p-2">
    <span class="text-xl text-white font-semibold">{{ title }}</span>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NoteHeader',
  props: {
    title: {
      type: String,
      default: 'Note'
    }
  }
})
</script>

<style lang="scss" scoped></style>
