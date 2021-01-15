<script lang="ts">
import { defineComponent, h } from 'vue'

import Editor, { EditorOptions } from '@toast-ui/editor'
import uml from '@toast-ui/editor-plugin-uml'
import 'codemirror/lib/codemirror.css'
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
  data(): Data {
    return {
      editor: null,
      options: {
        el: document.createElement('div'), // dummy for type
        customHTMLSanitizer: (html) => sanitize(html),
        height: '100%',
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
          this.$nextTick(() => {
            this.renderEditor()
          })
        }
      }
    }
  },
  methods: {
    setCodeMirrorOption() {
      const codemirror = this.editor?.getCodeMirror()
      codemirror?.setOption('tabindex', this.tabindex)
    },
    setChangePreviewButton() {
      const button = document.createElement('button')
      button.innerText = 'P'
      button.setAttribute('style', 'color:#000;line-height:1;font-weight:bold;')
      button.addEventListener('click', () => {
        if (this.editor?.getCurrentPreviewStyle() === 'tab') {
          this.editor?.changePreviewStyle('vertical')
        } else {
          this.editor?.changePreviewStyle('tab')
        }
      })
      const toolbar = this.editor?.getUI().getToolbar()
      toolbar?.insertItem(0, {
        type: 'button',
        options: {
          el: button,
          tooltip: 'Change preview style'
        }
      })
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
      this.editor?.remove()
      this.editor = new Editor(Object.assign(this.options, { plugins: [[uml, this.umlOptions]] }))

      this.setCodeMirrorOption()
      this.setChangePreviewButton()
    }
  },
  render() {
    return h('div')
  }
})
</script>
