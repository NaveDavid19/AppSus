import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'
import { NoteVideo } from './NoteVideo.jsx'

export function NotePreview({ note, deleteNote }) {
  switch (note.type) {
    case 'noteTxt':
      return <NoteTxt note={note} deleteNote={deleteNote} />
      break

    case 'noteImg':
      return <NoteImg note={note} deleteNote={deleteNote} />
      break

    case 'noteVideo':
      return <NoteVideo note={note} deleteNote={deleteNote} />
      break

    case 'noteTodos':
      return <NoteTodos note={note} deleteNote={deleteNote} />
      break
  }
}
