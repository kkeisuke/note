import type { Note } from '@/entity/Note'
import type { NoteSingleRepository } from '@/repository/NoteRepository'
import { noteMockRepository } from './NoteMockRepository'

export const noteSingleMockRepository: NoteSingleRepository = {
  async read(id: Note['id']) {
    if (!id) {
      throw new Error('empty id')
    }
    const note = noteMockRepository.notes.find((note) => note.id === id)
    if (note) {
      return note
    }
    throw new Error('not found note')
  },
  async update(note: Note) {
    if (!note.id) {
      throw new Error('empty id')
    }
    const target = noteMockRepository.notes.find((target) => target.id === note.id)
    const result = target ? Object.assign(target, note) : null
    if (!result) {
      throw new Error('error update')
    }
    return note
  },
  async delete(id: Note['id']) {
    if (!id) {
      throw new Error('empty id')
    }
    const index = noteMockRepository.notes.findIndex((note) => note.id === id)
    if (index >= 0) {
      noteMockRepository.notes.splice(index, 1)
      return id
    } else {
      throw new Error('error delete')
    }
  }
}
