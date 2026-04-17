import { ref, computed, type ComputedRef } from 'vue'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'

export const UseNoteReset = (): {
  reset: () => Promise<void>
  isProcessing: ComputedRef<boolean>
  resetResult: ComputedRef<boolean | null>
} => {
  const useNoteCollection = injectUseNoteCollection()
  const useNoteSingle = injectUseNoteSingle()

  const isProcessing = ref(false)
  const resetResult = ref<boolean | null>(null)

  async function reset(): Promise<void> {
    isProcessing.value = true
    resetResult.value = null

    try {
      await useNoteCollection.deleteAll()
      useNoteSingle.reset()
      resetResult.value = true
    } catch {
      resetResult.value = false
    } finally {
      isProcessing.value = false
    }
  }

  return {
    reset,
    isProcessing: computed(() => isProcessing.value),
    resetResult: computed(() => resetResult.value)
  }
}
