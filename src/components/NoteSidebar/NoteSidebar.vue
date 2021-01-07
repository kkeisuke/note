<template>
  <div :class="{ close: !useNoteSidebarLayout.isOpen.value }" class="NoteSidebar w-52 h-full overflow-hidden">
    <div class="flex justify-between border-b">
      <NoteSidebarBtn :is-open="useNoteSidebarLayout.isOpen.value" @click="useNoteSidebarLayout.toggle()" />
      <NoteMenu v-show="useNoteSidebarLayout.isOpen.value" />
    </div>
    <NoteList :class="{ close: !useNoteSidebarLayout.isOpen.value }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NoteSidebarBtn from '@/components/NoteSidebar/NoteSidebarBtn.vue'
import NoteMenu from '@/components/NoteList/NoteMenu.vue'
import NoteList from '@/components/NoteList/NoteList.vue'
import { UseNoteSidebarLayout } from '@/components/NoteSidebar/use/UseNoteSidebarLayout'

export default defineComponent({
  name: 'NoteSidebar',
  components: {
    NoteSidebarBtn,
    NoteMenu,
    NoteList
  },
  setup() {
    return {
      useNoteSidebarLayout: UseNoteSidebarLayout()
    }
  }
})
</script>

<style lang="scss" scoped>
.NoteSidebar {
  display: grid;
  grid-template-rows: auto 1fr;

  &.close {
    width: auto;
  }
  .NoteList.close {
    display: none;
  }
}
</style>
