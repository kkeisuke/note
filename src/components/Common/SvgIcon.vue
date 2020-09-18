<template>
  <svg v-bind="$attrs" class="inline-block">
    <use :xlink:href="svg" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup({ icon }) {
    return {
      svg: computed(() => `${require('bootstrap-icons/bootstrap-icons.svg')}#${icon}`)
    }
  }
})
</script>

<style lang="scss" scoped></style>
