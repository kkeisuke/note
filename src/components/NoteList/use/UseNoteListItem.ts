import { Ref, ref } from 'vue'
import { injectUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle, ReturnTypeUseNoteSingle } from '@/store/UseNoteSingle'
import type { Note } from '@/entity/Note'

const DELETE_TIMEOUT = 5000

export const UseNoteListItem = (): {
  select: ReturnTypeUseNoteSingle['read']
  isSelected: (id: Note['id']) => boolean
  canRemove: Ref<boolean>
  confirmRemove: (event: MouseEvent) => void
  remove: (event: MouseEvent, note: Note) => Promise<void>
} => {
  const useNoteCollection = injectUseNoteCollection()
  const useNoteSingle = injectUseNoteSingle()

  function isSelected(id: Note['id']) {
    return id === useNoteSingle.note.value.id
  }

  const canRemove = ref(false)

  function confirmRemove(event: MouseEvent) {
    event.stopPropagation()
    canRemove.value = true
    setTimeout(() => {
      canRemove.value = false
    }, DELETE_TIMEOUT)
  }

  async function remove(event: MouseEvent, note: Note) {
    event.stopPropagation()
    await useNoteSingle.destroy(note)
    useNoteCollection.fetch()
  }

  return {
    select: useNoteSingle.read,
    isSelected,
    canRemove,
    confirmRemove,
    remove
  }
}
