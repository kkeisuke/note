import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { provideUseNoteCollection, injectUseNoteCollection } from '@/store/UseNoteCollection'
import { provideUseNoteSingle, injectUseNoteSingle } from '@/store/UseNoteSingle'
import { UseNoteAdd } from '@/components/NoteList/use/UseNoteAdd'

describe('components/UseNoteAdd', () => {
  const useNoteAddComponent = defineComponent({
    setup() {
      return {
        useNoteAdd: UseNoteAdd(),
        useNoteCollection: injectUseNoteCollection(),
        useNoteSingle: injectUseNoteSingle()
      }
    },
    render() {
      return h('div')
    }
  })
  const wrapper = mount({
    components: {
      useNoteAddComponent
    },
    setup() {
      provideUseNoteCollection()
      provideUseNoteSingle()
      return {}
    },
    render() {
      return h(useNoteAddComponent)
    }
  })
  const vm = wrapper.findComponent(useNoteAddComponent).vm

  const useNoteAdd = vm.useNoteAdd
  const useNoteCollection = vm.useNoteCollection
  const useNoteSingle = vm.useNoteSingle
  useNoteCollection.fetch()

  test('add', async () => {
    await useNoteAdd.add()
    expect(useNoteCollection.notes.value.length).toBe(2)
    expect(useNoteSingle.note.value.id).toBe('test1')
  })
})
