import { getDefaultNote, type Note } from '@/entity/Note'

type NoteMockRepository = {
  notes: Note[]
  set: (note: Note) => void
  reset: () => void
}

export const noteMockRepository: NoteMockRepository = {
  notes: [],
  set(note: Note) {
    this.notes.push(note)
  },
  reset() {
    this.notes.length = 0
    const note = getDefaultNote()
    note.id = 'test0'
    note.title = 'title0'
    note.content = 'content0'
    this.set(note)
  }
}

// 初期データ
noteMockRepository.reset()
