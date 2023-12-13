import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes , deleteNote, editNote, todoToggle}) {
  return (
    <section className="note-list">
      <ul>
        {notes.map((note) => (
          <li key={note.id}><NotePreview note={note} deleteNote={deleteNote} editNote={editNote} todoToggle={todoToggle} from="noteList"/></li>
        ))}
      </ul>
    </section>
  )
}
