import { mount } from '@vue/test-utils'
import { injectUseNoteCollection, provideUseNoteCollection } from '@/store/UseNoteCollection'

describe('store/UseNoteCollection', () => {
  const useNoteCollection = mount({
    setup() {
      provideUseNoteCollection()
      const useNoteCollection = injectUseNoteCollection()

      return {
        useNoteCollection
      }
    },
    render() {
      return
    }
  }).vm.useNoteCollection

  test('add/fetch/notes', async () => {
    const newID = await useNoteCollection.add()
    expect(newID).toBe('test1')
    expect(useNoteCollection.notes.value.length).toBe(2)
  })
})
