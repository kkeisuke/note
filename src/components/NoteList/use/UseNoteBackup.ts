import { zipSync, strToU8 } from 'fflate'
import { saveAs } from 'file-saver'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { UseFilenameFormatter } from '@/formatter/UseFilenameFormatter'

export const UseNoteBackup = (): { backup: () => Promise<boolean> } => {
  const useNoteCollection = injectUseNoteCollection()
  const useFilenameFormatter = UseFilenameFormatter()

  async function backup(): Promise<boolean> {
    try {
      // 1. 全ノートを取得
      const notes = useNoteCollection.notes.value

      if (notes.length === 0) {
        return false
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

      return true
    } catch (error) {
      return false
    }
  }

  return {
    backup
  }
}
