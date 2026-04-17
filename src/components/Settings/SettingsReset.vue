<template>
  <Card class="SettingsReset">
    <p class="mb-2 text-lg">Reset</p>
    <p class="mb-4 text-sm text-gray-600">Delete all notes. This action cannot be undone.</p>
    <!-- リセットボタン -->
    <BaseButton :loading="isProcessing" loading-text="Resetting..." @click="handleReset">Delete All Notes</BaseButton>
    <!-- 結果メッセージ -->
    <p v-if="resetResult !== null" class="mt-4 text-sm">
      <span v-if="resetResult === true" class="text-green-600">All notes have been deleted</span>
      <span v-if="resetResult === false" class="text-red-600">Reset failed</span>
    </p>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UseNoteReset } from '@/components/Settings/use/UseNoteReset'
import Card from '@/components/Common/Card.vue'
import BaseButton from '@/components/Common/BaseButton.vue'

export default defineComponent({
  name: 'SettingsReset',
  components: {
    Card,
    BaseButton
  },
  setup() {
    const { reset, isProcessing, resetResult } = UseNoteReset()

    async function handleReset() {
      const confirmed = window.confirm('Delete all notes? This action cannot be undone.')
      if (!confirmed) {
        return
      }
      await reset()
    }

    return {
      isProcessing,
      resetResult,
      handleReset
    }
  }
})
</script>

<style lang="scss" scoped></style>
