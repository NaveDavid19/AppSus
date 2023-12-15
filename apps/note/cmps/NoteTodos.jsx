import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteTodos({
  note,
  changeBackgroundColor,
  deleteNote,
  editNote,
  from,
  todoToggle,
}) {
  function isDoneClass(todo) {
    return todo.isDone ? 'done' : 'todo'
  }

  function onTodo(note, todo) {
    todoToggle(note, todo)
  }

  switch (from) {
    case 'noteList':
      return (
        <article
          onClick={() => {
            editNote(note)
          }}
          className="note-preview"
          style={note.style}>
          <h2 className='note-title'>{note.info.title}</h2>
          {note.info.todos &&
            note.info.todos.map((todo) => {
              return (
                <li key={todo.id} onClick={(ev)=>{ev.stopPropagation()}}>
                  <span
                    onClick={() => {
                      onTodo(note, todo)
                    }}
                    className={`note-todo ${isDoneClass(todo)}`}>
                    {todo.txt}
                  </span>
                </li>
              )
            })}

          <PreviewButtons
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        </article>
      )
    case 'noteEdit':
  }
}
