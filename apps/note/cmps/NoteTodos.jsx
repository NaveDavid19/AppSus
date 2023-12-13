export function NoteTodos({ note, deleteNote, editNote, from }) {
  switch (from) {
    case 'noteList':
      return (
        <article className="note-preview">
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
          {note.info.todos &&
            note.info.todos.map((todo) => {
              return <li key={todo.id}>{todo.txt}</li>
            })}
        </article>
      )
    case 'noteEdit':
  }
}
