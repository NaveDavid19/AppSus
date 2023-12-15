import { NoteEditImg } from './NoteEditImg.jsx'
import { NoteEditTodos } from './NoteEditTodos.jsx'
import { NoteEditTxt } from './NoteEditTxt.jsx'
import { NoteEditVideo } from './NoteEditVideo.jsx'

export function NoteEdit({ selectedNote, setSelectedNote, saveNote ,deleteNote, pinNote}) {
  switch (selectedNote.type) {
    case 'noteTxt':
      return (
        <NoteEditTxt
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
          deleteNote={deleteNote} 
          pinNote={pinNote}
        />
      )

    case 'noteImg':
      return (
        <NoteEditImg
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
          deleteNote={deleteNote} 
          pinNote={pinNote}
        />
      )

    case 'noteVideo':
      return (
        <NoteEditVideo
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
          deleteNote={deleteNote} 
          pinNote={pinNote}
        />
      )

    case 'noteTodos':
      return (
        <NoteEditTodos
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
          deleteNote={deleteNote} 
          pinNote={pinNote}
        />
      )
  }
}
