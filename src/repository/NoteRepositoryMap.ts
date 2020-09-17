import type { NoteRepositoryMap } from './NoteRepository'
import { noteCollectionDexieRepository } from '@/repository/dexie/NoteCollectionDexieRepository'
import { noteSingleDexieRepository } from '@/repository/dexie/NoteSingleDexieRepository'
import { noteSingleLocalStorageRepository } from '@/repository/localStorage/NoteSingleLocalStorageRepository'
import { noteCollectionMockRepository } from '@/repository/mock/NoteCollectionMockRepository'
import { noteSingleMockRepository } from '@/repository/mock/NoteSingleMockRepository'

export const repositoryMap: NoteRepositoryMap = {
  mock: {
    noteCollection: noteCollectionMockRepository,
    noteSingle: noteSingleMockRepository,
    noteSingleCache: noteSingleLocalStorageRepository
  },
  dexie: {
    noteCollection: noteCollectionDexieRepository,
    noteSingle: noteSingleDexieRepository,
    noteSingleCache: noteSingleLocalStorageRepository
  }
}
