<template>
  <li class="p-3 border-b cursor-pointer" :class="{ 'bg-gray-300': useNoteListItem.isSelected(note.id) }" @click="useNoteListItem.select(note.id)">
    <p class="text-sm truncate">
      <span v-if="note.title">{{ note.title }}</span>
      <span v-else class="text-gray-500">No Title</span>
    </p>
    <p class="mt-1 text-xs truncate">
      <span v-if="note.content">{{ note.content }}</span>
      <span v-else class="text-gray-500">No Contents</span>
    </p>
    <div class="mt-2 flex justify-between items-start">
      <p class="text-xxs">
        created {{ useDateFormatter.datetime(note.createdAt) }} <br>
        updated {{ useDateFormatter.datetime(note.updatedAt) }}
      </p>
      <NoteListItemDelete :note="note"></NoteListItemDelete>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UseDateFormatter } from '@/formatter/UseDateFormatter'
import { UseNoteListItem } from '@/components/NoteList/use/UseNoteListItem'
import type { Note } from '@/entity/Note'

import NoteListItemDelete from '@/components/NoteList/NoteListItemDelete.vue'

export default defineComponent({
  name: 'NoteListItem',
  components: {
    NoteListItemDelete
  },
  props: {
    note: {
      type: Object as PropType<Note>,
      require: true,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    return {
      useNoteListItem: UseNoteListItem(),
      useDateFormatter: UseDateFormatter()
    }
  }
})
</script>

<style scoped></style>
