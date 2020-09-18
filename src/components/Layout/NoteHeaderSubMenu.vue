<template>
  <div class="NoteHeaderSubMenu flex items-center">
    <a href="https://kkeisuke.com/" target="_blank">
      <svg class="inline-block h-4 w-4 text-white">
        <use :xlink:href="house" />
      </svg>
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'NoteHeaderSubMenu',
  setup() {
    return {
      house: computed(() => `${require('bootstrap-icons/bootstrap-icons.svg')}#house-fill`)
    }
  }
})
</script>

<style lang="scss" scoped></style>
