<template>
  <div class="NoteHeaderSubMenu flex items-center">
    <a href="https://kkeisuke.com/" target="_blank">
      <SvgIcon icon="house-fill" class="h-4 w-4 text-white"></SvgIcon>
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
