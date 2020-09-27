import { Note } from '@/entity/Note'
import { saveAs } from 'file-saver'

const ext = 'md'

export const UseNoteDownload = (): { download: (note: Note) => void } => {
  function download(note: Note): void {
    saveAs(new Blob([note.content]), `${note.title}_${note.updatedAt}.${ext}`)
  }
  return {
    download
  }
}
