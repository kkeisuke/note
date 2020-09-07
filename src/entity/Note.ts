export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export function getDefaultNote(): Note {
  return {
    id: '',
    title: '',
    content: '',
    createdAt: '',
    updatedAt: ''
  }
}
