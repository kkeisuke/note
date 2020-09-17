import { NoteRepositoryMap } from './NoteRepository'
import { noteCollectionDexieRepository } from '@/repository/dexie/NoteCollectionDexieRepository'
import { noteSingleDexieRepository } from '@/repository/dexie/NoteSingleDexieRepository'
import { noteSingleLocalStorageRepository } from '@/repository/localStorage/NoteSingleLocalStorageRepository'

export const repositoryMap: NoteRepositoryMap = {
  mock: {
    noteCollection: noteCollectionDexieRepository,
    noteSingle: noteSingleDexieRepository,
    noteSingleCache: noteSingleLocalStorageRepository
  },
  dexie: {
    noteCollection: noteCollectionDexieRepository,
    noteSingle: noteSingleDexieRepository,
    noteSingleCache: noteSingleLocalStorageRepository
  }
}
