<template>
  <div class="NoteMenu border-b p-3 text-right">
    <button class="text-xs focus:outline-none" @click="useNoteMenu.addNote">
      <svg class="inline-block h-5 w-5 hover:text-indigo-600">
        <use :xlink:href="addIcon" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { UseNoteMenu } from '@/components/NoteList/use/UseNoteMenu'

export default defineComponent({
  name: 'NoteMenu',
  setup() {
    return {
      useNoteMenu: UseNoteMenu(),
      addIcon: computed(() => `${require('bootstrap-icons/bootstrap-icons.svg')}#plus-circle`)
    }
  }
})
</script>

<style lang="scss" scoped></style>
