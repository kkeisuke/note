import { computed, inject, provide, reactive } from 'vue'
import { noteRepositoryProvider } from '@/repository/NoteRepositoryProvider'
import { getDefaultNote, type Note } from '@/entity/Note'

const NoteSingle = {
  note: getDefaultNote(),
  set(note: Note) {
    Object.assign(this.note, note)
  },
  get(): Readonly<Note> {
    return this.note
  },
  reset() {
    this.set(getDefaultNote())
  }
}

const UseNoteSingle = () => {
  const noteSingle = reactive(NoteSingle)
  const repo = noteRepositoryProvider.getNoteSingleRepository()
  const cacheRepo = noteRepositoryProvider.getNoteSingleCacheRepository()

  async function read(id: Note['id']) {
    try {
      const note = await repo.read(id)
      noteSingle.set(note)
      cacheRepo.set(note)
    } catch (error) {
      cacheRepo.reset()
    }
  }

  function readCache() {
    const noteID = cacheRepo.get()
    if (noteID) {
      read(noteID)
    }
  }

  async function update(note: Note) {
    const result = await repo.update(note)
    noteSingle.set(result)
  }

  async function destroy(note: Note) {
    try {
      await repo.delete(note.id)
      const current = noteSingle.get()
      if (current.id === note.id) {
        noteSingle.reset()
        cacheRepo.reset()
      }
    } catch (error) {
      // 取り急ぎ error は出さない
    }
  }

  return {
    read,
    readCache,
    update,
    destroy,
    note: computed(() => noteSingle.get()),
    clone: computed(() => reactive({ ...noteSingle.get() }))
  }
}

export type ReturnTypeUseNoteSingle = ReturnType<typeof UseNoteSingle>
const USE_NOTE_SINGLE = Symbol()

export const provideUseNoteSingle = (): void => {
  provide(USE_NOTE_SINGLE, UseNoteSingle())
}

export const injectUseNoteSingle = (): ReturnTypeUseNoteSingle => {
  const useNoteSingle = inject<ReturnTypeUseNoteSingle>(USE_NOTE_SINGLE)

  if (useNoteSingle) {
    return useNoteSingle
  } else {
    throw new Error('error useNoteSingle')
  }
}
