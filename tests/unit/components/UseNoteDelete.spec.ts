import { mount } from '@vue/test-utils'
import { provideUseNoteCollection, injectUseNoteCollection } from '@/store/UseNoteCollection'
import { provideUseNoteSingle } from '@/store/UseNoteSingle'
import { UseNoteDelete } from '@/components/NoteList/use/UseNoteDelete'
import { getDefaultNote } from '@/entity/Note'

describe('components/UseNoteDelete', () => {
  const useNoteDeleteComponent = mount({
    setup() {
      provideUseNoteCollection()
      provideUseNoteSingle()

      return {
        useNoteDelete: UseNoteDelete(),
        useNoteCollection: injectUseNoteCollection()
      }
    },
    render() {
      return
    }
  })

  const useNoteDelete = useNoteDeleteComponent.vm.useNoteDelete
  const useNoteCollection = useNoteDeleteComponent.vm.useNoteCollection

  test('confirmRemove/canRemove', async () => {
    useNoteDelete.confirmRemove(0)
    expect(useNoteDelete.canRemove.value).toBe(true)
  })

  test('confirmRemove/canRemove/timeout', async () => {
    await useNoteDelete.confirmRemove(0)
    expect(useNoteDelete.canRemove.value).toBe(false)
  })

  test('remove', async () => {
    const note = getDefaultNote()
    note.id = 'test0'
    await useNoteDelete.remove(note)
    expect(useNoteCollection.notes.value.length).toBe(0)
  })
})
