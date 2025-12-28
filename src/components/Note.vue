<template>
  <div class="Note h-screen">
    <NoteHeader @toggle-settings="toggleSettings" />
    <!-- メインビュー -->
    <template v-if="!showSettings">
      <NoteSidebar />
      <NoteEdit @blur="useNoteCollection.fetch" />
    </template>
    <!-- 設定ビュー -->
    <SettingsView v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { UseSettingsView } from '@/components/Settings/use/UseSettingsView'

import NoteHeader from '@/components/Layout/NoteHeader.vue'
import NoteSidebar from '@/components/NoteSidebar/NoteSidebar.vue'
import NoteEdit from '@/components/NoteEdit/NoteEdit.vue'
import SettingsView from '@/components/Settings/SettingsView.vue'

export default defineComponent({
  name: 'Note',
  components: {
    NoteHeader,
    NoteSidebar,
    NoteEdit,
    SettingsView
  },
  setup() {
    const { showSettings, toggleSettings } = UseSettingsView()

    return {
      useNoteCollection: injectUseNoteCollection(),
      showSettings,
      toggleSettings
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
  .SettingsView {
    grid-column: 1 / 3;
  }
}
</style>
