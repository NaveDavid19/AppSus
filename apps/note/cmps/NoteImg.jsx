export function NoteImg({ note, deleteNote, editNote, from }) {
  switch (from) {
    case 'noteList':
      return (
        <article className="note-preview" style={note.style}>
          <button
            onClick={() => {
              deleteNote(note)
            }}>
            x
          </button>

          <button
            onClick={() => {
              editNote(note)
            }}>
            edit
          </button>

          <h2>{note.info.title}</h2>
          <img src={note.info.imgUrl} alt="{note.info.title}" />
        </article>
      )
    case 'noteEdit':
  }
}
