import { mount } from '@vue/test-utils'
import { injectUseNoteSingle, provideUseNoteSingle } from '@/store/UseNoteSingle'
import { UseNoteEdit } from '@/components/NoteEdit/use/UseNoteEdit'

describe('components/NoteEdit', () => {
  // localStorage 初期化
  const noteID = 'test0'
  window.localStorage.setItem('currentNote', noteID)

  const useNoteSingleComponent = mount({
    setup() {
      provideUseNoteSingle()
      const useNoteSingle = injectUseNoteSingle()

      return {
        useNoteEdit: UseNoteEdit(),
        useNoteSingle
      }
    },
    render() {
      return
    }
  })

  const useNoteEdit = useNoteSingleComponent.vm.useNoteEdit
  const useNoteSingle = useNoteSingleComponent.vm.useNoteSingle

  beforeAll(async () => {
    useNoteEdit.note.title = 'updated0'
  })

  test('readCache/note id changed', () => {
    expect(useNoteEdit.note.id).toBe(noteID)
  })

  test('note updated', async () => {
    expect(useNoteSingle.note.value.title).toBe(useNoteEdit.note.title)
  })
})
