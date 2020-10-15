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
    fill: {
      type: String,
      default: 'text-gray-700'
    },
    inverse: {
      type: Boolean,
      default: false
    }
  },
  setup({ icon, inverse, fill }) {
    return {
      svg: computed(() => `${require(`@/assets/icons/${icon}.svg`)}#icon`),
      color: computed(() => (inverse ? 'text-white' : fill))
    }
  }
})
</script>

<style lang="scss" scoped></style>
