import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { injectUseNoteSingle, provideUseNoteSingle } from '@/store/UseNoteSingle'
import { UseNoteEdit } from '@/components/NoteEdit/use/UseNoteEdit'

describe('components/NoteEdit', () => {
  // localStorage 初期化
  const noteID = 'test0'
  window.localStorage.setItem('currentNote', noteID)

  const useNoteSingleComponent = defineComponent({
    setup() {
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
  const wrapper = mount({
    components: {
      useNoteSingleComponent
    },
    setup() {
      provideUseNoteSingle()
      return {}
    },
    template: '<div><useNoteSingleComponent /></div>'
  })
  const vm = wrapper.findComponent(useNoteSingleComponent).vm

  const useNoteEdit = vm.useNoteEdit
  const useNoteSingle = vm.useNoteSingle

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
