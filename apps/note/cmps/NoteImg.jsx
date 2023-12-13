export function NoteImg({ note }) {

  return (
    <article className="note-preview">
      <h2>{note.info.title}</h2>
      <img src={note.info.imgUrl} alt="{note.info.title}"/>
    </article>
  )
}
