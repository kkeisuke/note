<template>
  <li
    class="NoteListItem p-2 border-b cursor-pointer"
    :class="{ 'bg-gray-300': useNoteListItem.isSelected(note.id) }"
    tabindex="0"
    @click="useNoteListItem.select(note.id)"
    @keydown.enter="useNoteListItem.select(note.id)"
  >
    <p class="text-sm truncate">
      <span v-if="note.title">{{ note.title }}</span>
      <span v-else class="text-gray-500">No Title</span>
    </p>
    <p class="mt-1 text-xs truncate">
      <span v-if="note.content">{{ note.content }}</span>
      <span v-else class="text-gray-500">No Contents</span>
    </p>
    <p class="mt-1 text-xxs">
      created {{ useDateFormatter.datetime(note.createdAt) }} <br />
      updated {{ useDateFormatter.datetime(note.updatedAt) }}
    </p>
    <div class="mt-2 flex justify-between items-center">
      <SvgIcon icon="download" class="h-4 w-4 hover:text-blue-600" @click.stop="useNoteDownload.download(note)" />
      <NoteListItemDelete :note="note" />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UseDateFormatter } from '@/formatter/UseDateFormatter'
import { UseNoteListItem } from '@/components/NoteList/use/UseNoteListItem'
import { UseNoteDownload } from '@/components/NoteList/use/UseNoteDownload'
import type { Note } from '@/entity/Note'

import SvgIcon from '@/components/Common/SvgIcon.vue'
import NoteListItemDelete from '@/components/NoteList/NoteListItemDelete.vue'

export default defineComponent({
  name: 'NoteListItem',
  components: {
    SvgIcon,
    NoteListItemDelete
  },
  props: {
    note: {
      type: Object as () => Note,
      require: true,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    return {
      useNoteListItem: UseNoteListItem(),
      useNoteDownload: UseNoteDownload(),
      useDateFormatter: UseDateFormatter()
    }
  }
})
</script>

<style scoped></style>
