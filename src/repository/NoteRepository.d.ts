import type { Note } from '@/entity/Note'

export type NoteRepository<T> = {
  init: () => void
  table: () => T
}

export type NoteCollectionRepository = {
  fetch: () => Promise<Note[]>
  add: (note: Note) => Promise<Note[]>
  remove: (note: Note) => Promise<Note[]>
}

export type NoteSingleRepository = {
  read: (id: string) => Promise<Note>
  update: (note: Note) => Promise<Note>
  delete: (id: string) => Promise
}

export type NoteRepositoryProvider = {
  getNoteRepository: () => NoteRepository
  getNoteSingleRepository: () => NoteSingleRepository
  getNoteCollectionRepository: () => NoteCollectionRepository
}
