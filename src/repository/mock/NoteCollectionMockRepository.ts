import type { Note } from '@/entity/Note'
import type { NoteCollectionRepository } from '@/repository/NoteRepository'
import { noteMockRepository } from './NoteMockRepository'

export const noteCollectionMockRepository: NoteCollectionRepository = {
  async add(note: Note) {
    const index = noteMockRepository.notes.length
    note.id = `test${index}`
    // title/content が未指定なら mock 用のダミー値を採番
    if (note.title === '') {
      note.title = `title${index}`
    }
    if (note.content === '') {
      note.content = `content${index}`
    }
    noteMockRepository.notes.push(note)
    return note.id
  },
  async fetch() {
    return noteMockRepository.notes
  },
  async deleteAll() {
    noteMockRepository.notes.length = 0
  }
}
