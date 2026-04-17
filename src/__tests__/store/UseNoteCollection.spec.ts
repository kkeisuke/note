import { describe, expect, test } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { injectUseNoteCollection, provideUseNoteCollection } from '@/store/UseNoteCollection'

describe('store/UseNoteCollection', () => {
  const useNoteComponent = defineComponent({
    setup() {
      const useNoteCollection = injectUseNoteCollection()
      return {
        useNoteCollection
      }
    },
    render() {
      return h('div')
    }
  })
  const wrapper = mount({
    components: {
      useNoteComponent
    },
    setup() {
      provideUseNoteCollection()
      return {}
    },
    render() {
      return h(useNoteComponent)
    }
  })

  const useNoteCollection = wrapper.findComponent(useNoteComponent).vm.useNoteCollection

  test('add/fetch/notes', async () => {
    const newID = await useNoteCollection.add()
    expect(newID).toBe('test1')
    expect(useNoteCollection.notes.value.length).toBe(2)
  })

  test('deleteAll で全ノートが削除される', async () => {
    await useNoteCollection.add()
    await useNoteCollection.fetch()

    // 削除前: 複数件存在すること
    const beforeCount = useNoteCollection.notes.value.length
    expect(beforeCount).toBe(3)

    await useNoteCollection.deleteAll()

    // 削除後: 0 件になっていること
    expect(useNoteCollection.notes.value.length).toBe(0)
  })
})
