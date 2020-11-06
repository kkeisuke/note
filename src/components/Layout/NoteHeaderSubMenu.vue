<template>
  <div class="NoteHeaderSubMenu flex items-center">
    <a href="https://kkeisuke.com/" target="_blank" class="leading-none">
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
  }
})
</script>

<style lang="scss" scoped></style>
