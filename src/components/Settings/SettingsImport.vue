<template>
  <Card class="SettingsImport">
    <p class="mb-2 text-lg">Import</p>
    <p class="mb-4 text-sm text-gray-600">Import multiple markdown files as new notes.</p>
    <!-- インポートボタン -->
    <BaseButton :loading="isProcessing" loading-text="Importing..." @click="openFileDialog">Import Notes</BaseButton>
    <!-- 隠しファイル選択 input -->
    <input ref="fileInput" type="file" accept=".md,text/markdown" multiple hidden @change="handleFileChange" />
    <!-- 結果メッセージ -->
    <p v-if="importResult !== null" class="mt-4 text-sm">
      <span v-if="importResult === true" class="text-green-600">Imported {{ importedCount }} notes</span>
      <span v-if="importResult === false" class="text-red-600">Import failed (no files selected or an error occurred)</span>
    </p>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UseNoteImport } from '@/components/Settings/use/UseNoteImport'
import Card from '@/components/Common/Card.vue'
import BaseButton from '@/components/Common/BaseButton.vue'

export default defineComponent({
  name: 'SettingsImport',
  components: {
    Card,
    BaseButton
  },
  setup() {
    const { importFiles, isProcessing, importResult, importedCount } = UseNoteImport()
    const fileInput = ref<HTMLInputElement | null>(null)

    function openFileDialog() {
      fileInput.value?.click()
    }

    async function handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement
      const files = input.files ? Array.from(input.files) : []
      await importFiles(files)
      // 同じファイルを再選択できるようにリセット
      input.value = ''
    }

    return {
      isProcessing,
      importResult,
      importedCount,
      fileInput,
      openFileDialog,
      handleFileChange
    }
  }
})
</script>

<style lang="scss" scoped></style>
