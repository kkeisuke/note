<template>
  <div class="Note h-screen">
    <NoteHeader />
    <NoteSidebar />
    <NoteEdit @blur="useNoteCollection.fetch" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'

import NoteHeader from '@/components/Layout/NoteHeader.vue'
import NoteSidebar from '@/components/NoteSidebar/NoteSidebar.vue'
import NoteEdit from '@/components/NoteEdit/NoteEdit.vue'

export default defineComponent({
  name: 'Note',
  components: {
    NoteHeader,
    NoteSidebar,
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
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;

  .NoteHeader {
    grid-column: 1 / 3;
  }
  .NoteEdit {
    grid-column: 2;
  }
}
</style>
