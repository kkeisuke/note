import type { Note } from '@/entity/Note'
import type { NoteSingleRepository } from '@/repository/NoteRepository'
import { noteDexieRepository } from '@/repository/dexie/NoteDexieRepository'
import dayjs from 'dayjs'

export const noteSingleDexieRepository: NoteSingleRepository = {
  async read(id: Note['id']) {
    if (!id) {
      throw new Error('empty id')
    }
    const note = await noteDexieRepository.table().get(id)
    if (note) {
      return note
    }
    throw new Error('not found note')
  },
  async update(note: Note) {
    if (!note.id) {
      throw new Error('empty id')
    }
    note.updatedAt = dayjs().format()
    const result = await noteDexieRepository.table().update(note.id, note)
    if (!result) {
      throw new Error('error update')
    }
    return note
  },
  delete(id: Note['id']) {
    if (!id) {
      throw new Error('empty id')
    }
    return noteDexieRepository.table().delete(id)
  }
}
