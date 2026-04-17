<template>
  <Card class="SettingsImport">
    <p class="mb-2 text-lg">Import</p>
    <p class="mb-4 text-sm text-gray-600">Import multiple markdown files as new notes.</p>
    <!-- インポートボタン -->
    <BaseButton :loading="isProcessing" loading-text="Importing..." @click="openFileDialog">Import Notes</BaseButton>
    <!-- 隠しファイル選択 input -->
    <BaseFileInput ref="fileInput" accept=".md,text/markdown" multiple hidden @change="handleFiles" />
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
import BaseFileInput from '@/components/Common/BaseFileInput.vue'

export default defineComponent({
  name: 'SettingsImport',
  components: {
    Card,
    BaseButton,
    BaseFileInput
  },
  setup() {
    const { importFiles, isProcessing, importResult, importedCount } = UseNoteImport()
    const fileInput = ref<(InstanceType<typeof BaseFileInput> & { open: () => void }) | null>(null)

    function openFileDialog() {
      fileInput.value?.open()
    }

    async function handleFiles(files: File[]) {
      await importFiles(files)
    }

    return {
      isProcessing,
      importResult,
      importedCount,
      fileInput,
      openFileDialog,
      handleFiles
    }
  }
})
</script>

<style lang="scss" scoped></style>
