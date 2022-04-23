import { Note } from '@/entity/Note'
import type { NoteCollectionRepository } from '@/repository/NoteRepository'
import { noteMockRepository } from './NoteMockRepository'

export const noteCollectionMockRepository: NoteCollectionRepository = {
  async add(note: Note) {
    note.id = `test${noteMockRepository.notes.length}`
    note.title = `title${noteMockRepository.notes.length}`
    note.content = `content${noteMockRepository.notes.length}`
    noteMockRepository.notes.push(note)
    return note.id
  },
  async fetch() {
    return noteMockRepository.notes
  }
}
