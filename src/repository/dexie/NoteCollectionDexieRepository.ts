import type { NoteCollectionRepository } from '@/repository/NoteRepository'
import { noteDexieRepository } from '@/repository/dexie/NoteDexieRepository'
import { Note } from '@/entity/Note'
import { v4 } from 'uuid'

export const noteCollectionDexieRepository: NoteCollectionRepository = {
  async add(note: Note) {
    note.id = v4()
    await noteDexieRepository.table().add(note)
    return this.fetch()
  },
  async remove(note: Note) {
    await noteDexieRepository.table().delete(note.id)
    return this.fetch()
  },
  fetch() {
    const order: keyof Note = 'updatedAt'
    return noteDexieRepository.table().reverse().sortBy(order)
  }
}
