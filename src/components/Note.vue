<template>
  <div class="Note h-screen">
    <NoteHeader />
    <NoteMenu class="w-64" />
    <NoteList class="w-64" />
    <NoteEdit @blur="useNoteCollection.fetch" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'

import NoteHeader from '@/components/Layout/NoteHeader.vue'
import NoteMenu from '@/components/NoteList/NoteMenu.vue'
import NoteList from '@/components/NoteList/NoteList.vue'
import NoteEdit from '@/components/NoteEdit/NoteEdit.vue'

export default defineComponent({
  name: 'Note',
  components: {
    NoteHeader,
    NoteMenu,
    NoteList,
    NoteEdit
  },
  setup() {
    return {
      useNoteCollection: injectUseNoteCollection()
    }
  }
})
</script>

<style lang="scss" scoped>
.Note {
  display: grid;
  grid-template-columns: auto 2fr;
  grid-template-rows: auto auto 3fr;

  .NoteHeader {
    grid-row: 1;
    grid-column: 1 / 3;
  }
  .NoteMenu {
    grid-row: 2;
  }
  .NoteList {
    grid-row: 3;
  }
  .NoteEdit {
    grid-column: 2;
    grid-row: 2 / 4;
  }
}
</style>
