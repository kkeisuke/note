import type { Note } from '@/entity/Note'

export type NoteRepository<T> = {
  init: () => void
  table: () => T
}

export type NoteCollectionRepository = {
  fetch: () => Promise<Note[]>
  add: (note: Note) => Promise<string>
}

export type NoteSingleRepository = {
  read: (id: Note['id']) => Promise<Note>
  update: (note: Note) => Promise<Note>
  delete: (id: Note['id']) => Promise
}

export type NoteSingleCacheRepository = {
  set: (note: Note) => void
  get: () => Note['id']
  reset: () => void
}

export type NoteRepositoryProvider = {
  getNoteRepository: () => NoteRepository
  getNoteCollectionRepository: () => NoteCollectionRepository
  getNoteSingleRepository: () => NoteSingleRepository
  getNoteSingleCacheRepository: () => NoteSingleCacheRepository
}
