import { ref, computed, type ComputedRef } from 'vue'
import { zipSync, strToU8 } from 'fflate'
import { saveAs } from 'file-saver'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { UseFilenameFormatter } from '@/formatter/UseFilenameFormatter'

export const UseNoteBackup = (): {
  backup: () => Promise<void>
  isProcessing: ComputedRef<boolean>
  backupResult: ComputedRef<boolean | null>
} => {
  const useNoteCollection = injectUseNoteCollection()
  const useFilenameFormatter = UseFilenameFormatter()

  const isProcessing = ref(false)
  const backupResult = ref<boolean | null>(null)

  async function backup(): Promise<void> {
    isProcessing.value = true
    backupResult.value = null

    try {
      // 1. 全ノートを取得
      const notes = useNoteCollection.notes.value

      if (notes.length === 0) {
        backupResult.value = false
        return
      }

      // 2. ZIP 用のファイルオブジェクトを作成
      const files: Record<string, Uint8Array> = {}
      const existingFilenames = new Set<string>()

      // 3. 各ノートを ZIP に追加
      for (const note of notes) {
        const filename = useFilenameFormatter.generateUnique(note.title, existingFilenames)
        const fullFilename = `${filename}.md`

        files[fullFilename] = strToU8(note.content)
        existingFilenames.add(fullFilename)
      }

      // 4. ZIP を生成（同期処理）
      const zipped = zipSync(files)

      // 5. Blob に変換してダウンロード
      const blob = new Blob([zipped], { type: 'application/zip' })
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
      saveAs(blob, `notes_backup_${timestamp}.zip`)

      backupResult.value = true
    } catch (error) {
      backupResult.value = false
    } finally {
      isProcessing.value = false
    }
  }

  return {
    backup,
    isProcessing: computed(() => isProcessing.value),
    backupResult: computed(() => backupResult.value)
  }
}
