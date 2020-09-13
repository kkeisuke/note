import type { ComputedRef } from 'vue'
import type { Note } from '@/entity/Note'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'

export const UseNoteList = (): { notes: ComputedRef<readonly Note[]> } => {
  const useNoteCollection = injectUseNoteCollection()
  useNoteCollection.fetch()

  return {
    notes: useNoteCollection.notes
  }
}
