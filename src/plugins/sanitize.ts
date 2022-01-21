import DOMPurify from 'dompurify'

// https://github.com/cure53/DOMPurify/blob/master/demos/hooks-target-blank-demo.html
DOMPurify.addHook('afterSanitizeAttributes', function (node) {
  if ('target' in node) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

export const sanitize = (html: string): string => {
  return DOMPurify.sanitize(html)
}
