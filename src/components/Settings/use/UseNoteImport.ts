import { ref, computed, type ComputedRef } from 'vue'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'

export const UseNoteImport = (): {
  importFiles: (files: File[]) => Promise<void>
  isProcessing: ComputedRef<boolean>
  importResult: ComputedRef<boolean | null>
  importedCount: ComputedRef<number>
} => {
  const useNoteCollection = injectUseNoteCollection()

  const isProcessing = ref(false)
  const importResult = ref<boolean | null>(null)
  const importedCount = ref(0)

  function filenameToTitle(name: string): string {
    return name.replace(/\.md$/i, '')
  }

  async function importFiles(files: File[]): Promise<void> {
    isProcessing.value = true
    importResult.value = null
    importedCount.value = 0

    try {
      if (files.length === 0) {
        importResult.value = false
        return
      }

      const partials = await Promise.all(
        files.map(async (file) => ({
          title: filenameToTitle(file.name),
          content: await file.text()
        }))
      )

      const count = await useNoteCollection.addMany(partials)
      importedCount.value = count
      importResult.value = true
    } catch {
      importResult.value = false
    } finally {
      isProcessing.value = false
    }
  }

  return {
    importFiles,
    isProcessing: computed(() => isProcessing.value),
    importResult: computed(() => importResult.value),
    importedCount: computed(() => importedCount.value)
  }
}
