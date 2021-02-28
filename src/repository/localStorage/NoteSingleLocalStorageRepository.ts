import type { NoteSingleCacheRepository } from '@/repository/NoteRepository'

const CACHE_KEY = 'currentNote'

export const noteSingleLocalStorageRepository: NoteSingleCacheRepository = {
  set(note) {
    window.localStorage.setItem(CACHE_KEY, note.id)
  },
  get() {
    return window.localStorage.getItem(CACHE_KEY) || ''
  },
  reset() {
    window.localStorage.setItem(CACHE_KEY, '')
  }
}
