import { getDefaultNote, Note } from '@/entity/Note'

type NoteMockRepository = {
  notes: Note[]
  set: (note: Note) => void
}

export const noteMockRepository: NoteMockRepository = {
  notes: [],
  set(note: Note) {
    this.notes.push(note)
  }
}

// 初期データ
const note = getDefaultNote()
note.id = 'test0'
note.title = 'title0'
note.content = 'content0'
noteMockRepository.set(note)
