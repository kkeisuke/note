<template>
  <div class="NoteList h-full overflow-y-auto">
    <ul>
      <template v-for="note in useNoteList.notes.value" :key="note.id">
        <NoteListItem :note="note" />
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NoteListItem from '@/components/NoteList/NoteListItem.vue'
import { UseNoteList } from '@/components/NoteList/use/UseNoteList'

export default defineComponent({
  name: 'NoteList',
  components: {
    NoteListItem
  },
  setup() {
    return {
      useNoteList: UseNoteList()
    }
  }
})
</script>

<style lang="scss" scoped></style>
