import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'

export const UseNoteMenu = (): { addNote: () => Promise<void> } => {
  const useNoteCollection = injectUseNoteCollection()
  const useNoteSingle = injectUseNoteSingle()

  const addNote = async () => {
    const id = await useNoteCollection.add()
    useNoteSingle.read(id)
  }

  return {
    addNote
  }
}
