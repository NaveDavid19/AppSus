export function NoteVideo({ note , deleteNote}) {
  return (
    <article className="note-preview">
      <button onClick={()=>{deleteNote(note)}}>x</button>
      <h2>{note.info.title}</h2>
    </article>
  )
}
