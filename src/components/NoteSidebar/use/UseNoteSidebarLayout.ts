import { readonly, Ref, ref } from 'vue'

export const UseNoteSidebarLayout = (): {
  isOpen: Ref<boolean>
  toggle: () => void
} => {
  const isOpen = ref(true)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen: readonly(isOpen),
    toggle
  }
}
