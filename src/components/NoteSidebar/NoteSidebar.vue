<template>
  <div :class="{ close: !useNoteSidebarLayout.isOpen.value }" class="NoteSidebar flex flex-col w-52 h-full overflow-hidden">
    <div class="flex justify-between border-b">
      <NoteSidebarBtn :is-open="useNoteSidebarLayout.isOpen.value" @click="useNoteSidebarLayout.toggleOpen()" />
      <NoteMenu v-show="useNoteSidebarLayout.isOpen.value" @show-search="useNoteSidebarLayout.toggleShowSearch()" />
    </div>
    <template v-if="useNoteSidebarLayout.isShowSearch.value">
      <NoteSearchList v-model="useNoteSidebarLayout.keyword.value" :class="{ hidden: !useNoteSidebarLayout.isOpen.value }" />
    </template>
    <NoteList :filter="useNoteSidebarLayout.keyword.value" :class="{ hidden: !useNoteSidebarLayout.isOpen.value }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NoteSidebarBtn from '@/components/NoteSidebar/NoteSidebarBtn.vue'
import NoteMenu from '@/components/NoteList/NoteMenu.vue'
import NoteSearchList from '@/components/NoteList/NoteSearchList.vue'
import NoteList from '@/components/NoteList/NoteList.vue'
import { UseNoteSidebarLayout } from '@/components/NoteSidebar/use/UseNoteSidebarLayout'

export default defineComponent({
  name: 'NoteSidebar',
  components: {
    NoteSidebarBtn,
    NoteMenu,
    NoteSearchList,
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
  &.close {
    width: auto;
  }
}
</style>
