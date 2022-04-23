import { computed, ComputedRef, Ref, ref } from 'vue'

export const UseNoteSidebarLayout = (): {
  isOpen: ComputedRef<boolean>
  isShowSearch: ComputedRef<boolean>
  keyword: Ref<string>
  toggleOpen: () => void
  toggleShowSearch: () => void
} => {
  const isOpen = ref(true)
  const isShowSearch = ref(false)
  const keyword = ref('')

  const toggleOpen = () => {
    isOpen.value = !isOpen.value
  }

  const toggleShowSearch = () => {
    isShowSearch.value = !isShowSearch.value
    if (!isShowSearch.value) {
      keyword.value = ''
    }
  }

  return {
    isOpen: computed(() => isOpen.value),
    isShowSearch: computed(() => isShowSearch.value),
    keyword,
    toggleOpen,
    toggleShowSearch
  }
}
