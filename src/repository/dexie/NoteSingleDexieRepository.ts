import type { Note } from '@/entity/Note'
import type { NoteSingleRepository } from '@/repository/NoteRepository.d.ts'
import { noteDexieRepository } from '@/repository/dexie/NoteDexieRepository'
import dayjs from 'dayjs'

export const noteSingleDexieRepository: NoteSingleRepository = {
  async read(id: string) {
    const note = await noteDexieRepository.table().get(id)
    if (note) {
      return note
    }
    throw new Error('not found note')
  },
  async update(note: Note) {
    note.updatedAt = dayjs().format()
    const result = await noteDexieRepository.table().update(note.id, note)
    if (!result) {
      throw new Error('error update')
    }
    return note
  },
  delete(id: string) {
    return noteDexieRepository.table().delete(id)
  }
}
