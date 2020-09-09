import { inject, provide, reactive } from 'vue'
import { noteRepositoryProvider } from '@/repository/NoteRepositoryProvider'
import { getDefaultNote, Note } from '@/entity/Note'

const NoteSingle = {
  note: getDefaultNote(),
  set(note: Note) {
    this.note = note
  },
  get(): Readonly<Note> {
    return this.note
  }
}

const UseNoteSingle = () => {
  const noteSingle = reactive(NoteSingle)
  const repo = noteRepositoryProvider.getNoteSingleRepository()

  async function read(id: string) {
    const note = await repo.read(id)
    noteSingle.set(note)
  }

  async function update(note: Note) {
    const result = await repo.update(note)
    noteSingle.set(result)
  }

  async function destroy(note: Note) {
    await repo.delete(note.id)
  }

  return {
    read,
    update,
    destroy
  }
}

type ReturnUseNoteSingle = ReturnType<typeof UseNoteSingle>
const USE_NOTE_SINGLE = Symbol()

export const provideUseNoteSingle = (): void => {
  provide(USE_NOTE_SINGLE, UseNoteSingle())
}

export const injectUseNoteSingle = (): ReturnUseNoteSingle => {
  const useNoteSingle = inject<ReturnUseNoteSingle>(USE_NOTE_SINGLE)

  if (useNoteSingle) {
    return useNoteSingle
  } else {
    throw new Error('error useNoteSingle')
  }
}
