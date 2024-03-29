import { describe, expect, test } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { provideUseNoteCollection, injectUseNoteCollection } from '@/store/UseNoteCollection'
import { provideUseNoteSingle } from '@/store/UseNoteSingle'
import { UseNoteDelete } from '@/components/NoteList/use/UseNoteDelete'
import { getDefaultNote } from '@/entity/Note'

describe('components/UseNoteDelete', () => {
  const useNoteDeleteComponent = defineComponent({
    setup() {
      return {
        useNoteDelete: UseNoteDelete(),
        useNoteCollection: injectUseNoteCollection()
      }
    },
    render() {
      return h('div')
    }
  })
  const wrapper = mount({
    components: {
      useNoteDeleteComponent
    },
    setup() {
      provideUseNoteCollection()
      provideUseNoteSingle()
      return {}
    },
    render() {
      return h(useNoteDeleteComponent)
    }
  })
  const vm = wrapper.findComponent(useNoteDeleteComponent).vm

  const useNoteDelete = vm.useNoteDelete
  const useNoteCollection = vm.useNoteCollection
  useNoteCollection.fetch()

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
