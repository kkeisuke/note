<script lang="ts">
import { defineComponent, h, nextTick } from 'vue'

import Editor, { EditorOptions } from '@toast-ui/editor'
import uml from '@toast-ui/editor-plugin-uml'
import '@toast-ui/editor/dist/toastui-editor.css'

import { sanitize } from '@/plugins/sanitize'

type Data = {
  editor: Editor | null
  options: EditorOptions
  umlOptions: {
    rendererURL: string
  }
}

export default defineComponent({
  name: 'MarkdownEditor',
  props: {
    id: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:content', 'blur'],
  data(): Data {
    return {
      editor: null,
      options: {
        el: document.createElement('div'), // dummy for type
        customHTMLSanitizer: (html) => sanitize(html),
        height: '100%',
        extendedAutolinks: true,
        previewStyle: 'vertical',
        previewHighlight: false
      },
      // @TODO https://github.com/nhn/tui.editor/issues/1089
      umlOptions: {
        rendererURL: process.env.VUE_APP_PLANTUML_URL
      }
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(id: string) {
        if (id) {
          nextTick(() => {
            this.renderEditor()
          })
        }
      }
    }
  },
  methods: {
    setEditorAttribute() {
      this.editor?.getEditorElements()?.mdEditor.querySelector('[contenteditable="true"]')?.setAttribute('tabindex', String(this.tabindex))
    },
    setChangePreviewButton() {
      const button = document.createElement('button')
      button.innerText = 'P'
      button.className = 'toastui-editor-toolbar-icons'
      button.style.margin = '0'
      button.style.backgroundImage = 'none'
      button.style.fontSize = '20px'
      button.addEventListener('click', () => {
        if (this.editor?.getCurrentPreviewStyle() === 'tab') {
          this.editor?.changePreviewStyle('vertical')
          this.options.previewStyle = 'vertical'
        } else {
          this.editor?.changePreviewStyle('tab')
          this.options.previewStyle = 'tab'
        }
      })
      this.editor?.insertToolbarItem({ groupIndex: 0, itemIndex: 0 }, { name: 'PreviewStyleBtn', el: button, tooltip: 'Change preview style' })
    },
    renderEditor() {
      this.options.el = this.$el
      this.options.initialValue = this.content
      this.options.events = {
        change: () => {
          this.$emit('update:content', this.editor?.getMarkdown())
        },
        blur: () => {
          this.$emit('blur')
        }
      }
      this.editor?.off('change')
      this.editor?.off('blur')
      this.editor?.destroy()
      this.editor = new Editor(Object.assign(this.options, { plugins: [[uml, this.umlOptions]] }))

      this.setEditorAttribute()
      this.setChangePreviewButton()
    }
  },
  render() {
    return h('div')
  }
})
</script>
