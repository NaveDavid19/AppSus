import { NoteAddTodos } from './NoteAddTodos.jsx'
import { NoteAddTxt } from './NoteAddTxt.jsx'

export function NoteAddType({addNote, type}) {
  switch (type) {
    case 'noteTxt':
      return (
        <NoteAddTxt
          addNote={addNote}
          type={type}
        />
      )

    case 'noteTodos':
      return (
        <NoteAddTodos
          addNote={addNote}
          type={type}
        />
      )
  }
}
