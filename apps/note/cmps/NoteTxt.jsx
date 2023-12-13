export function NoteTxt({ note, deleteNote }) {
  return (
    <article className="note-preview">
      <button
        onClick={() => {
          deleteNote(note)
        }}>
        x
      </button>
      <h2>{note.info.title}</h2>
      <h3>{note.info.txt}</h3>
    </article>
  )
}
