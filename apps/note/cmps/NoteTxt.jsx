export function NoteTxt({ note }) {

  return (
    <article className="note-preview">
      <h2>{note.info.title}</h2>
      <h3>{note.info.txt}</h3>
    </article>
  )
}
