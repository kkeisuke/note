<template>
  <div class="NoteMenu py-3 px-2 leading-snug flex gap-x-2">
    <!-- id for E2E test -->
    <button id="noteSearch" class="text-xs focus:outline-none">
      <SvgIcon icon="search-circle" class="h-5 w-5 hover:text-blue-600" @click="$emit('show-search')" />
    </button>
    <!-- id for E2E test -->
    <button id="noteAdd" class="text-xs focus:outline-none" @click="useNoteAdd.add">
      <SvgIcon icon="plus-circle" class="h-5 w-5 hover:text-blue-600" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UseNoteAdd } from '@/components/NoteList/use/UseNoteAdd'
import SvgIcon from '@/components/Common/SvgIcon.vue'

export default defineComponent({
  name: 'NoteMenu',
  components: {
    SvgIcon
  },
  emits: ['show-search'],
  setup() {
    return {
      useNoteAdd: UseNoteAdd()
    }
  }
})
</script>

<style lang="scss" scoped></style>
