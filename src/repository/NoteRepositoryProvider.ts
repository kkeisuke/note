import type { RepositoryInfo, NoteRepositoryProvider } from '@/repository/NoteRepository'
import { repositoryMap } from '@/repository/NoteRepositoryMap'

const repositoryInfo: RepositoryInfo = {
  name:'mock'
}

export function initRepositoryProvider(name: RepositoryInfo['name']) {
  repositoryInfo.name = name
}

export const noteRepositoryProvider: NoteRepositoryProvider = {
  getNoteCollectionRepository() {
    return repositoryMap[repositoryInfo.name].noteCollection
  },
  getNoteSingleRepository() {
    return repositoryMap[repositoryInfo.name].noteSingle
  },
  getNoteSingleCacheRepository() {
    return repositoryMap[repositoryInfo.name].noteSingleCache
  }
}
