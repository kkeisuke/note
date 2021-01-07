<template>
  <div class="NoteSidebarBtn py-3 px-2 leading-snug">
    <!-- id for E2E test -->
    <button id="sidebarBtn" class="text-xs focus:outline-none">
      <SvgIcon :icon="icon" class="h-5 w-5 hover:text-blue-600" />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SvgIcon from '@/components/Common/SvgIcon.vue'

export default defineComponent({
  name: 'NoteSidebarBtn',
  components: {
    SvgIcon
  },
  props: {
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    return {
      icon: computed(() => (props.isOpen ? 'chevron-double-left' : 'chevron-double-right'))
    }
  }
})
</script>
