<template>
  <svg v-bind="$attrs" class="inline-block" :class="{ [color]: true }">
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
    },
    inverse: {
      type: Boolean,
      default: false
    }
  },
  setup({ icon, inverse }) {
    return {
      svg: computed(() => `${require(`@/assets/icons/${icon}.svg`)}#icon`),
      color: computed(() => (inverse ? 'text-white' : 'text-gray-700'))
    }
  }
})
</script>

<style lang="scss" scoped></style>
