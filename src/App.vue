<template>
  <div class="App h-screen">
    <NoteHeader></NoteHeader>
    <NoteMenu class="w-64"></NoteMenu>
    <NoteList class="w-64"></NoteList>
    <NoteEdit @blur="useNoteCollection.fetch"></NoteEdit>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { injectUseNoteCollection, provideUseNoteCollection } from '@/store/UseNoteCollection'
import { provideUseNoteSingle } from '@/store/UseNoteSingle'

import NoteHeader from '@/components/Layout/NoteHeader.vue'
import NoteMenu from '@/components/NoteList/NoteMenu.vue'
import NoteList from '@/components/NoteList/NoteList.vue'
import NoteEdit from '@/components/NoteEdit/NoteEdit.vue'

export default defineComponent({
  name: 'App',
  components: {
    NoteHeader,
    NoteMenu,
    NoteList,
    NoteEdit
  },
  setup() {
    provideUseNoteCollection()
    provideUseNoteSingle()

    return {
      useNoteCollection: injectUseNoteCollection()
    }
  }
})
</script>

<style lang="scss" scoped>
.App {
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
