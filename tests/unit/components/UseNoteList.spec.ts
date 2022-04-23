import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { injectUseNoteCollection, provideUseNoteCollection } from '@/store/UseNoteCollection'
import { UseNoteList } from '@/components/NoteList/use/UseNoteList'
import { UseNoteAdd } from '@/components/NoteList/use/UseNoteAdd'
import { provideUseNoteSingle } from '@/store/UseNoteSingle'

describe('component/NoteList', () => {
  const useNoteListComponent = defineComponent({
    setup() {
      return {
        useNoteAdd: UseNoteAdd(),
        useNoteList: UseNoteList(),
        useNoteCollection: injectUseNoteCollection()
      }
    },
    render() {
      return h('div')
    }
  })
  const wrapper = mount({
    components: {
      useNoteListComponent
    },
    setup() {
      provideUseNoteCollection()
      provideUseNoteSingle()
      return {}
    },
    render() {
      return h(useNoteListComponent)
    }
  })
  const vm = wrapper.findComponent(useNoteListComponent).vm
  vm.useNoteCollection.fetch()
  vm.useNoteAdd.add()

  test('search', () => {
    expect(vm.useNoteList.search('').value.length).toBe(2)
    expect(vm.useNoteList.search('title0').value.length).toBe(1)
    expect(vm.useNoteList.search('content1').value.length).toBe(1)
    expect(vm.useNoteList.search('title2').value.length).toBe(0)
  })
})
