import { describe, expect, test, vi, beforeEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { provideUseNoteCollection, injectUseNoteCollection } from '@/store/UseNoteCollection'
import { provideUseNoteSingle, injectUseNoteSingle } from '@/store/UseNoteSingle'
import { UseNoteBackup } from '@/components/NoteList/use/UseNoteBackup'
import { saveAs } from 'file-saver'
import { noteMockRepository } from '@/repository/mock/NoteMockRepository'

describe('components/UseNoteBackup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // テスト間でのリセット：モックリポジトリを初期状態に戻す
    noteMockRepository.reset()
  })

  const useNoteBackupComponent = defineComponent({
    setup() {
      return {
        useNoteBackup: UseNoteBackup(),
        useNoteCollection: injectUseNoteCollection(),
        useNoteSingle: injectUseNoteSingle()
      }
    },
    render() {
      return h('div')
    }
  })

  test('複数ノートをバックアップできる', async () => {
    const wrapper = mount({
      components: {
        useNoteBackupComponent
      },
      setup() {
        provideUseNoteCollection()
        provideUseNoteSingle()
        return {}
      },
      render() {
        return h(useNoteBackupComponent)
      }
    })
    const vm = wrapper.findComponent(useNoteBackupComponent).vm
    const useNoteBackup = vm.useNoteBackup
    const useNoteCollection = vm.useNoteCollection

    // 全ノートを取得
    await useNoteCollection.fetch()

    // バックアップを実行
    const result = await useNoteBackup.backup()

    // 成功を確認
    expect(result).toBe(true)

    // saveAs が呼ばれたことを確認
    expect(saveAs).toHaveBeenCalledTimes(1)

    // 引数を検証
    const [blob, filename] = vi.mocked(saveAs).mock.calls[0]
    expect(blob).toBeInstanceOf(Blob)
    expect((blob as Blob).size).toBeGreaterThan(0)
    expect((blob as Blob).type).toBe('application/zip')
    expect(filename).toMatch(/^notes_backup_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.zip$/)
  })

  test('空のノートリストでは false を返す', async () => {
    const wrapper = mount({
      components: {
        useNoteBackupComponent
      },
      setup() {
        provideUseNoteCollection()
        provideUseNoteSingle()
        return {}
      },
      render() {
        return h(useNoteBackupComponent)
      }
    })
    const vm = wrapper.findComponent(useNoteBackupComponent).vm
    const useNoteBackup = vm.useNoteBackup
    const useNoteCollection = vm.useNoteCollection
    const useNoteSingle = vm.useNoteSingle

    // 全ノートを取得
    await useNoteCollection.fetch()

    // 全ノートを削除して空にする
    for (const note of useNoteCollection.notes.value) {
      await useNoteSingle.destroy(note)
    }

    // 空のノートリストを再取得
    await useNoteCollection.fetch()

    const result = await useNoteBackup.backup()

    // 失敗を確認
    expect(result).toBe(false)
    expect(saveAs).not.toHaveBeenCalled()
  })
})
