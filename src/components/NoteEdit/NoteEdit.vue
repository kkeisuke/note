<template>
  <div class="NoteEdit w-full border">
    <div v-if="useNoteEdit.note.id" class="content h-full">
      <div>
        <input v-model="useNoteEdit.note.title" type="text" tabindex="1" class="w-full p-3 outline-none" placeholder="Title" @blur="$emit('blur')" />
      </div>
      <MarkdownEditor :id="useNoteEdit.note.id" v-model:content="useNoteEdit.note.content" :tabindex="2" @blur="$emit('blur')"></MarkdownEditor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MarkdownEditor from '@/components/NoteEdit/MarkdownEditor.vue'
import { UseNoteEdit } from '@/components/NoteEdit/use/UseNoteEdit'

export default defineComponent({
  name: 'NoteEdit',
  components: {
    MarkdownEditor
  },
  setup() {
    return {
      useNoteEdit: UseNoteEdit()
    }
  }
})
</script>

<style lang="scss" scoped>
.NoteEdit {
  .content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 2fr;
  }
}
</style>
