import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'

export const UseNoteAdd = (): { add: () => Promise<void> } => {
  const useNoteCollection = injectUseNoteCollection()
  const useNoteSingle = injectUseNoteSingle()

  const add = async () => {
    const id = await useNoteCollection.add()
    useNoteSingle.read(id)
  }

  return {
    add
  }
}
