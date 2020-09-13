<template>
  <li class="p-3 border-b cursor-pointer" :class="{ 'bg-gray-300': useNoteListItem.isSelected(note.id) }" @click="useNoteListItem.select(note.id)">
    <p class="text-sm">
      <span v-if="note.title">{{ note.title }}</span>
      <span v-else class="text-gray-400">No Title</span>
    </p>
    <p class="text-xs truncate">{{ note.content }}</p>
    <div class="flex justify-between">
      <p class="text-xs">{{ useDateFormatter.datetime(note.updatedAt) }}</p>
      <template v-if="useNoteListItem.canRemove.value">
        <button class="text-red-500 text-xs focus:outline-none" @click="useNoteListItem.remove($event, note)">delete</button>
      </template>
      <template v-else>
        <button class="text-xs focus:outline-none" @click="useNoteListItem.confirmRemove">
          <svg class="inline-block h-4 w-4 hover:text-red-600">
            <use :xlink:href="removeIcon" />
          </svg>
        </button>
      </template>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { UseDateFormatter } from '@/formatter/UseDateFormatter'
import { UseNoteListItem } from '@/components/NoteList/use/UseNoteListItem'
import type { Note } from '@/entity/Note'

export default defineComponent({
  name: 'NoteListItem',
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
      useDateFormatter: UseDateFormatter(),
      removeIcon: computed(() => `${require('bootstrap-icons/bootstrap-icons.svg')}#x`)
    }
  }
})
</script>

<style scoped></style>
