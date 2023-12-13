import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'
import { NoteVideo } from './NoteVideo.jsx'

export function NotePreview({
  note,
  deleteNote,
  editNote,
  saveNote,
  todoToggle,
  from,
}) {
  switch (note.type) {
    case 'noteTxt':
      return (
        <NoteTxt
          note={note}
          deleteNote={deleteNote}
          editNote={editNote}
          saveNote={saveNote}
          from={from}
        />
      )

    case 'noteImg':
      return (
        <NoteImg
          note={note}
          deleteNote={deleteNote}
          editNote={editNote}
          saveNote={saveNote}
          from={from}
        />
      )

    case 'noteVideo':
      return (
        <NoteVideo
          note={note}
          deleteNote={deleteNote}
          editNote={editNote}
          saveNote={saveNote}
          from={from}
        />
      )

    case 'noteTodos':
      return (
        <NoteTodos
          note={note}
          deleteNote={deleteNote}
          editNote={editNote}
          saveNote={saveNote}
          todoToggle={todoToggle}
          from={from}
        />
      )
  }
}
