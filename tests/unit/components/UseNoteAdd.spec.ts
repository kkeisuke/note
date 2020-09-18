import { mount } from '@vue/test-utils'
import { provideUseNoteCollection, injectUseNoteCollection } from '@/store/UseNoteCollection'
import { provideUseNoteSingle, injectUseNoteSingle } from '@/store/UseNoteSingle'
import { UseNoteAdd } from '@/components/NoteList/use/UseNoteAdd'

describe('components/UseNoteAdd', () => {
  const useNoteAddComponent = mount({
    setup() {
      provideUseNoteCollection()
      provideUseNoteSingle()

      return {
        useNoteAdd: UseNoteAdd(),
        useNoteCollection: injectUseNoteCollection(),
        useNoteSingle: injectUseNoteSingle()
      }
    },
    render() {
      return
    }
  })

  const useNoteAdd = useNoteAddComponent.vm.useNoteAdd
  const useNoteCollection = useNoteAddComponent.vm.useNoteCollection
  const useNoteSingle = useNoteAddComponent.vm.useNoteSingle

  test('add', async () => {
    await useNoteAdd.add()
    expect(useNoteCollection.notes.value.length).toBe(2)
    expect(useNoteSingle.note.value.id).toBe('test1')
  })
})
