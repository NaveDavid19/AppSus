import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes , deleteNote}) {
  return (
    <section className="note-list">
      <ul>
        {notes.map((note) => (
          <li key={note.id}><NotePreview note={note} deleteNote={deleteNote} /></li>
        ))}
      </ul>
    </section>
  )
}
