<template>
  <div class="NoteMenu border-b p-3 text-right">
    <!-- id for E2E test -->
    <button id="noteAdd" class="text-xs focus:outline-none" @click="useNoteAdd.add">
      <SvgIcon icon="plus-circle" class="h-6 w-6 hover:text-blue-600"></SvgIcon>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UseNoteAdd } from '@/components/NoteList/use/UseNoteAdd'
import SvgIcon from '@/components/Common/SvgIcon.vue'

export default defineComponent({
  name: 'NoteMenu',
  components: {
    SvgIcon
  },
  setup() {
    return {
      useNoteAdd: UseNoteAdd()
    }
  }
})
</script>

<style lang="scss" scoped></style>
