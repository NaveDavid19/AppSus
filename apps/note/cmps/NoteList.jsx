export function NoteList({ notes }) {
  return (
    <section className="note-list">
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.info.title}</li>
        ))}
      </ul>
    </section>
  )
}
