import { injectUseNoteSingle, ReturnTypeUseNoteSingle } from '@/store/UseNoteSingle'
import type { Note } from '@/entity/Note'

export const UseNoteListItem = (): {
  select: ReturnTypeUseNoteSingle['read']
  isSelected: (id: Note['id']) => boolean
} => {
  const useNoteSingle = injectUseNoteSingle()

  function isSelected(id: Note['id']) {
    return id === useNoteSingle.note.value.id
  }

  return {
    select: useNoteSingle.read,
    isSelected
  }
}
