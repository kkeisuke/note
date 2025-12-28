<template>
  <div class="NoteHeaderSubMenu flex items-center gap-3">
    <!-- 設定アイコン -->
    <button class="leading-none hover:opacity-80 transition-opacity" @click="$emit('toggle-settings')">
      <SvgIcon icon="settings" class="h-5 w-5" inverse />
    </button>

    <!-- ホームアイコン -->
    <a href="https://kkeisuke.com/" target="_blank" class="leading-none hover:opacity-80 transition-opacity">
      <SvgIcon icon="home-fill" class="h-5 w-5" inverse />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@/components/Common/SvgIcon.vue'

export default defineComponent({
  name: 'NoteHeaderSubMenu',
  components: {
    SvgIcon
  },
  emits: ['toggle-settings']
})
</script>

<style lang="scss" scoped></style>
