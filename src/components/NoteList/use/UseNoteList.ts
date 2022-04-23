import { computed, ComputedRef } from 'vue'
import type { Note } from '@/entity/Note'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'

export const UseNoteList = (): {
  notes: ComputedRef<readonly Note[]>
  search: (keyword: string) => ComputedRef<readonly Note[]>
} => {
  const useNoteCollection = injectUseNoteCollection()
  useNoteCollection.fetch()

  return {
    notes: useNoteCollection.notes,
    search: (keyword) => {
      return computed(() => useNoteCollection.notes.value.filter((note) => note.title.includes(keyword) || note.content.includes(keyword)))
    }
  }
}
