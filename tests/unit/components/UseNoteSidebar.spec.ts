import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { UseNoteSidebarLayout } from '@/components/NoteSidebar/use/UseNoteSidebarLayout'

describe('component/NoteSidebar', () => {
  const useNoteSidebarLayout = mount(
    defineComponent({
      setup() {
        return {
          useNoteSidebarLayout: UseNoteSidebarLayout()
        }
      },
      render() {
        return h('div')
      }
    })
  ).vm.useNoteSidebarLayout

  test('useNoteSidebarLayout/close', () => {
    expect(useNoteSidebarLayout.isOpen.value).toBeTruthy()
    useNoteSidebarLayout.toggleOpen()
    expect(useNoteSidebarLayout.isOpen.value).toBeFalsy()
    useNoteSidebarLayout.toggleOpen()
    expect(useNoteSidebarLayout.isOpen.value).toBeTruthy()
  })
  test('useNoteSidebarLayout/show search input', (done) => {
    expect(useNoteSidebarLayout.isShowSearch.value).toBeFalsy()
    useNoteSidebarLayout.toggleShowSearch()
    expect(useNoteSidebarLayout.isShowSearch.value).toBeTruthy()
    useNoteSidebarLayout.keyword.value = 'test'
    useNoteSidebarLayout.toggleShowSearch()
    expect(useNoteSidebarLayout.isShowSearch.value).toBeFalsy()
    nextTick(() => {
      expect(useNoteSidebarLayout.keyword.value).toBe('')
      done()
    })
  })
})
