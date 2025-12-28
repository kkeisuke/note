<template>
  <Card class="SettingsBackup">
    <p class="mb-2 text-lg">Backup</p>
    <p class="mb-4 text-sm text-gray-600">Download all notes as a ZIP file.</p>
    <!-- バックアップボタン -->
    <BaseButton :loading="isProcessing" loading-text="Backing up..." @click="handleBackup">Backup Notes</BaseButton>
    <!-- 結果メッセージ -->
    <p v-if="backupResult !== null" class="mt-4 text-sm">
      <span v-if="backupResult === true" class="text-green-600">Backup completed successfully</span>
      <span v-if="backupResult === false" class="text-red-600">Backup failed (no notes found or an error occurred)</span>
    </p>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UseNoteBackup } from '@/components/NoteList/use/UseNoteBackup'
import Card from '@/components/Common/Card.vue'
import BaseButton from '@/components/Common/BaseButton.vue'

export default defineComponent({
  name: 'SettingsBackup',
  components: {
    Card,
    BaseButton
  },
  setup() {
    const { backup, isProcessing, backupResult } = UseNoteBackup()

    async function handleBackup() {
      await backup()
    }

    return {
      isProcessing,
      backupResult,
      handleBackup
    }
  }
})
</script>

<style lang="scss" scoped></style>
