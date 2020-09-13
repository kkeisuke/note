import { Ref, ref } from 'vue'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'
import type { Note } from '@/entity/Note'

const DELETE_TIMEOUT = 5000

export const UseNoteDelete = (): {
  canRemove: Ref<boolean>
  confirmRemove: () => void
  remove: (note: Note) => Promise<void>
} => {
  const useNoteCollection = injectUseNoteCollection()
  const useNoteSingle = injectUseNoteSingle()

  const canRemove = ref(false)

  function confirmRemove() {
    canRemove.value = true
    setTimeout(() => {
      canRemove.value = false
    }, DELETE_TIMEOUT)
  }

  async function remove(note: Note) {
    await useNoteSingle.destroy(note)
    useNoteCollection.fetch()
  }

  return {
    canRemove,
    confirmRemove,
    remove
  }
}
