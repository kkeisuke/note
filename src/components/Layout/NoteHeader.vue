<template>
  <h1 class="NoteHeader bg-gray-700 p-2">
    <div class="flex justify-between items-center">
      <span class="text-xl text-white font-semibold">{{ title }}</span>
      <NoteHeaderSubMenu @toggle-settings="$emit('toggle-settings')" />
    </div>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NoteHeaderSubMenu from '@/components/Layout/NoteHeaderSubMenu.vue'

export default defineComponent({
  name: 'NoteHeader',
  components: {
    NoteHeaderSubMenu
  },
  props: {
    title: {
      type: String,
      default: 'Note'
    }
  },
  emits: ['toggle-settings']
})
</script>

<style lang="scss" scoped></style>
