<template>
  <input ref="inputEl" type="file" @change="onChange" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BaseFileInput',
  emits: {
    change: (files: File[]) => Array.isArray(files)
  },
  setup(_props, { emit, expose }) {
    const inputEl = ref<HTMLInputElement | null>(null)

    function open() {
      inputEl.value?.click()
    }

    function onChange(event: Event) {
      const target = event.target as HTMLInputElement
      const files = target.files ? Array.from(target.files) : []
      emit('change', files)
      // 同じファイルを再選択できるようにリセット
      target.value = ''
    }

    expose({ open })

    return {
      inputEl,
      onChange
    }
  }
})
</script>

<style lang="scss" scoped></style>
