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
})
