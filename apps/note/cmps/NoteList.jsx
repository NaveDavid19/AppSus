import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes , deleteNote, editNote, todoToggle,changeBackgroundColor}) {
  return (
    <section className="note-list-section">
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id}><NotePreview note={note} deleteNote={deleteNote} editNote={editNote} todoToggle={todoToggle} changeBackgroundColor={changeBackgroundColor} from="noteList"/></li>
        ))}
      </ul>
    </section>
  )
}
