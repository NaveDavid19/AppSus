import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'
import { NoteVideo } from './NoteVideo.jsx'

export function NotePreview({
  note,
  deleteNote,
  editNote,
  saveNote,
  changeBackgroundColor,
  todoToggle,
  from,
  pinNote,
}) {
  switch (note.type) {
    case 'noteTxt':
      return (
        <NoteTxt
          note={note}
          changeBackgroundColor={changeBackgroundColor}
          deleteNote={deleteNote}
          editNote={editNote}
          saveNote={saveNote}
          from={from}
          pinNote={pinNote}
        />
      )

    case 'noteImg':
      return (
        <NoteImg
          note={note}
          changeBackgroundColor={changeBackgroundColor}
          deleteNote={deleteNote}
          editNote={editNote}
          saveNote={saveNote}
          from={from}
          pinNote={pinNote}
        />
      )

    case 'noteVideo':
      return (
        <NoteVideo
          note={note}
          changeBackgroundColor={changeBackgroundColor}
          deleteNote={deleteNote}
          editNote={editNote}
          saveNote={saveNote}
          from={from}
          pinNote={pinNote}
        />
      )

    case 'noteTodos':
      return (
        <NoteTodos
          note={note}
          changeBackgroundColor={changeBackgroundColor}
          deleteNote={deleteNote}
          editNote={editNote}
          saveNote={saveNote}
          todoToggle={todoToggle}
          from={from}
          pinNote={pinNote}
        />
      )
  }
}
