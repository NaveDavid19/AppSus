export function NoteTodos({ note, deleteNote, editNote, from, todoToggle }) {
  
  function isDoneClass(todo) {
    return todo.isDone ? 'done' : 'todo'
  }

  function onTodo(note, todo) {
    todoToggle(note, todo)
  }

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
              return (
                <li key={todo.id}>
                  <span
                    onClick={() => {
                      onTodo(note, todo)
                    }}
                    className={isDoneClass(todo)}>
                    {todo.txt}
                  </span>
                </li>
              )
            })}
        </article>
      )
    case 'noteEdit':
  }
}
