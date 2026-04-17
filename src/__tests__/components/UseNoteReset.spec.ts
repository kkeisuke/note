import { describe, expect, test, beforeEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { provideUseNoteCollection, injectUseNoteCollection } from '@/store/UseNoteCollection'
import { provideUseNoteSingle, injectUseNoteSingle } from '@/store/UseNoteSingle'
import { UseNoteReset } from '@/components/Settings/use/UseNoteReset'
import { noteMockRepository } from '@/repository/mock/NoteMockRepository'

describe('components/UseNoteReset', () => {
  beforeEach(() => {
    noteMockRepository.reset()
  })

  const useNoteResetComponent = defineComponent({
    setup() {
      return {
        useNoteReset: UseNoteReset(),
        useNoteCollection: injectUseNoteCollection(),
        useNoteSingle: injectUseNoteSingle()
      }
    },
    render() {
      return h('div')
    }
  })

  function mountComponent() {
    return mount({
      components: {
        useNoteResetComponent
      },
      setup() {
        provideUseNoteCollection()
        provideUseNoteSingle()
        return {}
      },
      render() {
        return h(useNoteResetComponent)
      }
    })
  }

  test('reset で collection.deleteAll と single.reset が協調実行され、状態が正しく遷移する', async () => {
    const wrapper = mountComponent()
    const vm = wrapper.findComponent(useNoteResetComponent).vm
    const useNoteReset = vm.useNoteReset
    const useNoteCollection = vm.useNoteCollection
    const useNoteSingle = vm.useNoteSingle

    // 事前: ノートを 1 件開いた状態にする
    await useNoteCollection.fetch()
    const existing = useNoteCollection.notes.value[0]
    await useNoteSingle.read(existing.id)

    // 削除前: ノートが存在し、現在ノートが設定されていること
    expect(useNoteCollection.notes.value.length).toBe(1)
    expect(useNoteSingle.note.value.id).toBe(existing.id)
    expect(useNoteReset.isProcessing.value).toBe(false)
    expect(useNoteReset.resetResult.value).toBe(null)

    await useNoteReset.reset()

    // 削除後: 両ストアが協調して初期化されたこと
    expect(useNoteCollection.notes.value.length).toBe(0)
    expect(useNoteSingle.note.value.id).toBe('')

    // UseNoteReset 固有の状態
    expect(useNoteReset.isProcessing.value).toBe(false)
    expect(useNoteReset.resetResult.value).toBe(true)
  })
})
