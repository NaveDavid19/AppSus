export function NoteTodos({ note , deleteNote}) {

  return (
    <article className="note-preview">
      <button onClick={()=>{deleteNote(note)}}>x</button>
      <h2>{note.info.title}</h2>
      {note.info.todos && note.info.todos.map(todo => {
        return (
          <li key={todo.id}>{todo.txt}</li>
        )
      })}
    </article>
  )
}
