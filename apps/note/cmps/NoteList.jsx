import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes , deleteNote, editNote}) {
  return (
    <section className="note-list">
      <ul>
        {notes.map((note) => (
          <li key={note.id}><NotePreview note={note} deleteNote={deleteNote} editNote={editNote} from="noteList"/></li>
        ))}
      </ul>
    </section>
  )
}
