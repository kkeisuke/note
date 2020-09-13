import { watch } from 'vue'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'
import type { Note } from '@/entity/Note'

export const UseNoteEdit = (): { note: Note } => {
  const useNoteSingle = injectUseNoteSingle()
  const note = useNoteSingle.note.value
  const clone = useNoteSingle.clone.value

  // 前回開いていた note を取得
  useNoteSingle.readCache()

  // 切替
  watch(
    () => note.id,
    () => {
      Object.assign(clone, note)
    }
  )

  // 更新
  watch([() => clone.id, () => clone.title + clone.content], (newVal, oldVal) => {
    const newID = newVal[0]
    const oldID = oldVal[0]
    if (newID && oldID && newID === oldID) {
      useNoteSingle.update(clone)
    }
  })

  return {
    note: clone
  }
}
