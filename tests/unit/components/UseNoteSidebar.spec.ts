import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
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
    useNoteSidebarLayout.toggle()
    expect(useNoteSidebarLayout.isOpen.value).toBeFalsy()
    useNoteSidebarLayout.toggle()
    expect(useNoteSidebarLayout.isOpen.value).toBeTruthy()
  })
})
