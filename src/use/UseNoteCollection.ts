import { inject, provide, reactive } from 'vue'
import { noteRepositoryProvider } from '@/repository/NoteRepositoryProvider'
import { Note } from '@/entity/Note'

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

  async function add(note: Note) {
    const notes = await repo.add(note)
    noteCollection.set(notes)
  }

  async function remove(note: Note) {
    const notes = await repo.remove(note)
    noteCollection.set(notes)
  }

  function getNotes() {
    return noteCollection.get()
  }

  return {
    fetch,
    add,
    remove,
    getNotes
  }
}

type ReturnUseNoteCollection = ReturnType<typeof UseNoteCollection>
const USE_NOTE_COLLECTION = Symbol()

export const provideUseNoteCollection = (): void => {
  provide(USE_NOTE_COLLECTION, UseNoteCollection())
}

export const injectUseNoteCollection = (): ReturnUseNoteCollection => {
  const useNoteCollection = inject<ReturnUseNoteCollection>(USE_NOTE_COLLECTION)

  if (useNoteCollection) {
    return useNoteCollection
  } else {
    throw new Error('error useNoteCollection')
  }
}
