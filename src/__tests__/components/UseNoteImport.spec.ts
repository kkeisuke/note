import { describe, expect, test, beforeEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { provideUseNoteCollection, injectUseNoteCollection } from '@/store/UseNoteCollection'
import { UseNoteImport } from '@/components/Settings/use/UseNoteImport'
import { noteMockRepository } from '@/repository/mock/NoteMockRepository'

describe('components/UseNoteImport', () => {
  beforeEach(() => {
    noteMockRepository.reset()
  })

  const useNoteImportComponent = defineComponent({
    setup() {
      return {
        useNoteImport: UseNoteImport(),
        useNoteCollection: injectUseNoteCollection()
      }
    },
    render() {
      return h('div')
    }
  })

  function mountComponent() {
    return mount({
      components: {
        useNoteImportComponent
      },
      setup() {
        provideUseNoteCollection()
        return {}
      },
      render() {
        return h(useNoteImportComponent)
      }
    })
  }

  test('複数 .md ファイルをインポートできる', async () => {
    const wrapper = mountComponent()
    const vm = wrapper.findComponent(useNoteImportComponent).vm
    const useNoteImport = vm.useNoteImport
    const useNoteCollection = vm.useNoteCollection

    await useNoteCollection.fetch()
    const beforeCount = useNoteCollection.notes.value.length

    expect(useNoteImport.isProcessing.value).toBe(false)
    expect(useNoteImport.importResult.value).toBe(null)
    expect(useNoteImport.importedCount.value).toBe(0)

    const files = [new File(['body one'], 'memo1.md', { type: 'text/markdown' }), new File(['body two'], 'memo2.md', { type: 'text/markdown' })]
    await useNoteImport.importFiles(files)

    expect(useNoteImport.isProcessing.value).toBe(false)
    expect(useNoteImport.importResult.value).toBe(true)
    expect(useNoteImport.importedCount.value).toBe(2)

    await useNoteCollection.fetch()
    const notes = useNoteCollection.notes.value
    expect(notes.length).toBe(beforeCount + 2)

    const titles = notes.map((n) => n.title)
    expect(titles).toContain('memo1')
    expect(titles).toContain('memo2')

    const memo1 = notes.find((n) => n.title === 'memo1')
    expect(memo1?.content).toBe('body one')
  })

  test('空配列では importResult が false になる', async () => {
    const wrapper = mountComponent()
    const vm = wrapper.findComponent(useNoteImportComponent).vm
    const useNoteImport = vm.useNoteImport
    const useNoteCollection = vm.useNoteCollection

    await useNoteCollection.fetch()
    const beforeCount = useNoteCollection.notes.value.length

    await useNoteImport.importFiles([])

    expect(useNoteImport.isProcessing.value).toBe(false)
    expect(useNoteImport.importResult.value).toBe(false)
    expect(useNoteImport.importedCount.value).toBe(0)

    await useNoteCollection.fetch()
    expect(useNoteCollection.notes.value.length).toBe(beforeCount)
  })

  test('ファイル名から .md 拡張子が除かれる', async () => {
    const wrapper = mountComponent()
    const vm = wrapper.findComponent(useNoteImportComponent).vm
    const useNoteImport = vm.useNoteImport
    const useNoteCollection = vm.useNoteCollection

    const files = [new File(['x'], 'test.md', { type: 'text/markdown' })]
    await useNoteImport.importFiles(files)

    await useNoteCollection.fetch()
    const titles = useNoteCollection.notes.value.map((n) => n.title)
    expect(titles).toContain('test')
    expect(titles).not.toContain('test.md')
  })
})
