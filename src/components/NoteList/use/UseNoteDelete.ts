import { Ref, ref } from 'vue'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle } from '@/store/UseNoteSingle'
import type { Note } from '@/entity/Note'

const DELETE_TIMEOUT = 5000

export const UseNoteDelete = (): {
  canRemove: Ref<boolean>
  confirmRemove: (time?: number) => Promise<boolean>
  remove: (note: Note) => Promise<void>
} => {
  const useNoteCollection = injectUseNoteCollection()
  const useNoteSingle = injectUseNoteSingle()

  const canRemove = ref(false)

  function confirmRemove(time: number = DELETE_TIMEOUT) {
    canRemove.value = true
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        canRemove.value = false
        resolve(canRemove.value)
      }, time)
    })
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
