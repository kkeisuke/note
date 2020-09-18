<template>
  <div class="NoteMenu border-b p-3 text-right">
    <button class="text-xs focus:outline-none" @click="useNoteAdd.add">
      <SvgIcon icon="plus-circle" class="h-5 w-5 hover:text-indigo-600"></SvgIcon>
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
