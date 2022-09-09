<template>
  <template v-if="useNoteDelete.canRemove.value">
    <button class="NoteListItemDelete text-red-500 text-xs focus:outline-none leading-none" @click.stop="useNoteDelete.remove(note)">delete</button>
  </template>
  <template v-else>
    <button class="NoteListItemDelete text-xs focus:outline-none leading-none" tabindex="-1" @click.stop="useNoteDelete.confirmRemove()">
      <SvgIcon icon="x" class="h-4 w-4 hover:text-red-500" />
    </button>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UseNoteDelete } from '@/components/NoteList/use/UseNoteDelete'
import type { Note } from '@/entity/Note'
import SvgIcon from '@/components/Common/SvgIcon.vue'

export default defineComponent({
  name: 'NoteListItemDelete',
  components: {
    SvgIcon
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
    const useNoteDelete = UseNoteDelete()

    return {
      useNoteDelete
    }
  }
})
</script>

<style lang="scss" scoped></style>
