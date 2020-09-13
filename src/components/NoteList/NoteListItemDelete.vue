<template>
  <template v-if="useNoteDelete.canRemove.value">
    <button class="text-red-500 text-xs focus:outline-none" @click="remove">delete</button>
  </template>
  <template v-else>
    <button class="text-xs focus:outline-none" @click="confirmRemove">
      <svg class="inline-block h-4 w-4 hover:text-red-600">
        <use :xlink:href="removeIcon" />
      </svg>
    </button>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { UseNoteDelete } from '@/components/NoteList/use/UseNoteDelete'
import type { Note } from '@/entity/Note'

export default defineComponent({
  name: 'NoteListItemDelete',
  props: {
    note: {
      type: Object as PropType<Note>,
      require: true,
      default: () => {
        return {}
      }
    }
  },
  setup({ note }) {
    const useNoteDelete = UseNoteDelete()

    function confirmRemove(event: MouseEvent) {
      event.stopPropagation()
      useNoteDelete.confirmRemove()
    }

    function remove(event: MouseEvent) {
      event.stopPropagation()
      useNoteDelete.remove(note)
    }

    return {
      useNoteDelete,
      confirmRemove,
      remove,
      removeIcon: computed(() => `${require('bootstrap-icons/bootstrap-icons.svg')}#x`)
    }
  }
})
</script>

<style lang="scss" scoped></style>
