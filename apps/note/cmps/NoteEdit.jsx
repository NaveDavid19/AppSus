import { NoteEditImg } from './NoteEditImg.jsx'
import { NoteEditTodos } from './NoteEditTodos.jsx'
import { NoteEditTxt } from './NoteEditTxt.jsx'
import { NoteEditVideo } from './NoteEditVideo.jsx'

export function NoteEdit({ selectedNote, setSelectedNote, saveNote }) {
  switch (selectedNote.type) {
    case 'noteTxt':
      return (
        <NoteEditTxt
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
        />
      )

    case 'noteImg':
      return (
        <NoteEditImg
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
        />
      )

    case 'noteVideo':
      return (
        <NoteEditVideo
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
        />
      )

    case 'noteTodos':
      return (
        <NoteEditTodos
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
        />
      )
  }
}
