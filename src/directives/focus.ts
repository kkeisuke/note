import { Directive } from '@vue/runtime-core'

export const vFocus: Directive<HTMLElement> = {
  mounted(el) {
    el.focus()
  }
}
