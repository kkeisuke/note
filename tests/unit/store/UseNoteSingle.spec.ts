import { mount } from '@vue/test-utils'
import { injectUseNoteCollection, provideUseNoteCollection } from '@/store/UseNoteCollection'
import { injectUseNoteSingle, provideUseNoteSingle } from '@/store/UseNoteSingle'
import { getDefaultNote } from '@/entity/Note'

describe('store/UseNoteSingle', () => {
  const useNoteSingleComponent = mount({
    setup() {
      provideUseNoteCollection()
      const useNoteCollection = injectUseNoteCollection()
      provideUseNoteSingle()
      const useNoteSingle = injectUseNoteSingle()

      return {
        useNoteCollection,
        useNoteSingle
      }
    },
    render() {
      return
    }
  })

  const useNoteCollection = useNoteSingleComponent.vm.useNoteCollection
  const useNoteSingle = useNoteSingleComponent.vm.useNoteSingle
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
