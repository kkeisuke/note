<template>
  <Note />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provideUseNoteCollection } from '@/store/UseNoteCollection'
import { provideUseNoteSingle } from '@/store/UseNoteSingle'

import Note from '@/components/Note.vue'

export default defineComponent({
  name: 'App',
  components: {
    Note
  },
  setup() {
    provideUseNoteCollection()
    provideUseNoteSingle()

    return {}
  }
})
</script>
