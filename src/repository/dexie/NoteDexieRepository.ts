import type { NoteRepository } from '@/repository/NoteRepository'
import type { Note } from '@/entity/Note'
import Dexie from 'dexie'

const note: Readonly<Note> = {
  id: '&',
  title: '',
  content: '',
  createdAt: '',
  updatedAt: ''
}
const ver = 1
const DBName = 'Note'
const tableName = DBName.toLowerCase()
const db = new Dexie(DBName)

export const noteDexieRepository: NoteRepository<Dexie.Table<Note, string>> = {
  init() {
    const schema = {
      note: (Object.keys(note) as Array<keyof Note>).map((key) => note[key] + key).join(',')
    }
    db.version(ver).stores(schema)
  },
  table() {
    return db.table<Note, string>(tableName)
  }
}

// 初期化
noteDexieRepository.init()
