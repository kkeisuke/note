import type { NoteRepositoryProvider } from '@/repository/NoteRepository'
import { noteDexieRepository } from '@/repository/dexie/NoteDexieRepository'
import { noteCollectionDexieRepository } from '@/repository/dexie/NoteCollectionDexieRepository'
import { noteSingleDexieRepository } from '@/repository/dexie/NoteSingleDexieRepository'

export const noteRepositoryProvider: NoteRepositoryProvider = {
  getNoteRepository() {
    return noteDexieRepository
  },
  getNoteCollectionRepository() {
    return noteCollectionDexieRepository
  },
  getNoteSingleRepository() {
    return noteSingleDexieRepository
  }
}
