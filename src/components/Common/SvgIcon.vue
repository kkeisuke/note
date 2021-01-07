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
  setup(props) {
    return {
      svg: computed(() => `${require(`@/assets/icons/${props.icon}.svg`)}#icon`),
      color: computed(() => (props.inverse ? 'text-white' : props.fill))
    }
  }
})
</script>

<style lang="scss" scoped></style>
