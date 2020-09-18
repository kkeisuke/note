import type { NoteCollectionRepository } from '@/repository/NoteRepository'
import type { Note } from '@/entity/Note'
import { noteDexieRepository } from '@/repository/dexie/NoteDexieRepository'
import { v4 } from 'uuid'
import dayjs from 'dayjs'

export const noteCollectionDexieRepository: NoteCollectionRepository = {
  add(note: Note) {
    note.id = v4()
    note.createdAt = dayjs().format()
    note.updatedAt = dayjs().format()
    return noteDexieRepository.table().add(note)
  },
  fetch() {
    const order: keyof Note = 'createdAt'
    return noteDexieRepository.table().reverse().sortBy(order)
  }
}
