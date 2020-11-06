import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { injectUseNoteCollection, provideUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle, provideUseNoteSingle } from '@/store/UseNoteSingle'
import { getDefaultNote } from '@/entity/Note'

describe('store/UseNoteSingle', () => {
  const useNoteSingleComponent = defineComponent({
    setup() {
      const useNoteCollection = injectUseNoteCollection()
      const useNoteSingle = injectUseNoteSingle()
      return {
        useNoteCollection,
        useNoteSingle
      }
    },
    render() {
      return h('div')
    }
  })
  const wrapper = mount({
    components: {
      useNoteSingleComponent
    },
    setup() {
      provideUseNoteCollection()
      provideUseNoteSingle()
      return {}
    },
    render() {
      return h(useNoteSingleComponent)
    }
  })
  const vm = wrapper.findComponent(useNoteSingleComponent).vm

  const useNoteCollection = vm.useNoteCollection
  const useNoteSingle = vm.useNoteSingle
  const note = getDefaultNote()
  const noteID = 'test1'
  note.id = noteID

  beforeEach(async () => {
    await useNoteCollection.add()
  })

  afterEach(async () => {
    await useNoteSingle.destroy(note)
    await useNoteCollection.fetch()
  })

  test('read empty', async () => {
    await useNoteSingle.read('')
    expect(useNoteSingle.note.value.id).toBe('')
    expect(useNoteSingle.clone.value.id).toBe('')
    expect(window.localStorage.getItem('currentNote')).toBe('')
  })

  test('read', async () => {
    await useNoteSingle.read(noteID)
    expect(useNoteSingle.note.value.id).toBe(noteID)
    expect(useNoteSingle.clone.value.id).toBe(noteID)
    expect(window.localStorage.getItem('currentNote')).toBe(noteID)
  })

  test('destroy', async () => {
    await useNoteSingle.read(noteID)
    await useNoteSingle.destroy(note)
    expect(useNoteSingle.note.value.id).toBe('')
    expect(useNoteSingle.clone.value.id).toBe('')
    expect(window.localStorage.getItem('currentNote')).toBe('')
  })

  test('update', async () => {
    const target = getDefaultNote()
    target.id = noteID
    target.title = 'updated0'
    await useNoteSingle.update(target)
    expect(useNoteSingle.note.value.id).toBe(target.id)
    expect(useNoteSingle.clone.value.id).toBe(target.id)
    expect(useNoteSingle.note.value.title).toBe(target.title)
    expect(useNoteSingle.clone.value.title).toBe(target.title)
  })
})
