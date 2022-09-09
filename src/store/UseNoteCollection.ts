import { computed, inject, provide, reactive } from 'vue'
import { noteRepositoryProvider } from '@/repository/NoteRepositoryProvider'
import { getDefaultNote, type Note } from '@/entity/Note'

const NoteCollection = {
  notes: [] as Note[],
  set(notes: Note[]) {
    this.notes = notes
  },
  get(): Readonly<Note[]> {
    return this.notes
  }
}

const UseNoteCollection = () => {
  const noteCollection = reactive(NoteCollection)
  const repo = noteRepositoryProvider.getNoteCollectionRepository()

  async function fetch() {
    const notes = await repo.fetch()
    noteCollection.set(notes)
  }

  async function add() {
    const id = await repo.add(getDefaultNote())
    fetch()
    return id
  }

  return {
    fetch,
    add,
    notes: computed(() => noteCollection.get())
  }
}

export type ReturnTypeUseNoteCollection = ReturnType<typeof UseNoteCollection>
const USE_NOTE_COLLECTION = Symbol()

export const provideUseNoteCollection = (): void => {
  provide(USE_NOTE_COLLECTION, UseNoteCollection())
}

export const injectUseNoteCollection = (): ReturnTypeUseNoteCollection => {
  const useNoteCollection = inject<ReturnTypeUseNoteCollection>(USE_NOTE_COLLECTION)

  if (useNoteCollection) {
    return useNoteCollection
  } else {
    throw new Error('error useNoteCollection')
  }
}
