const { useState } = React

import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { ColorButtonsAdd } from './ColorButtonsAdd.jsx'

export function NoteAddTodos({ addNote, type }) {
  const [todos, setTodos] = useState([
    {
      id: utilService.makeId(),
      txt: '',
      isDone: false,
    },
  ])
  const [title, setTitle] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('#e9e3d4')

  function onChangeTitleHandle(ev) {
    const value = ev.target.value
    setTitle(value)
  }

  function onChangeTodoHandle(ev, id) {
    const { name, value } = ev.target
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, [name]: value } : todo
      )
    )
  }

  function addTodo() {
    const newTodo = {
      id: utilService.makeId(),
      txt: '',
      isDone: false,
    }
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  function removeTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  function onSubmitHandle(ev) {
    ev.preventDefault()
    let emptyNote = noteService.getEmptyNote()
    emptyNote.info = { ...emptyNote.info, title, todos }
    emptyNote.style = { backgroundColor: '#ff0000' }
    addNote({ ...emptyNote, type })
    setTodos([
      {
        id: utilService.makeId(),
        txt: '',
        isDone: false,
      },
    ])
    setTitle('')
  }

  function changeBackgroundColor(colorHex) {
    setBackgroundColor(colorHex)
  }

  return (
    <React.Fragment>
      <form style={{ backgroundColor }} onSubmit={onSubmitHandle}>
        <input
          required
          className="title-input"
          type="text"
          placeholder="Title"
          name="title"
          id="title"
          value={title}
          onChange={onChangeTitleHandle}
        />
        {todos.map((todo) => (
          <div key={todo.id} className="todo-wrapper">
            <input
              type="text"
              placeholder="txt"
              className="todo-input"
              name="txt"
              value={todo.txt}
              onChange={(ev) => onChangeTodoHandle(ev, todo.id)}
            />
            <button
              type="button"
              className="todo-remove-btn"
              onClick={() => removeTodo(todo.id)}>
              <i class="fa-solid fa-x"></i>
            </button>
          </div>
        ))}
        <button type="button" onClick={addTodo}>
          Add Todo
        </button>
        <button type="submit">Add Note</button>
      </form>
      <ColorButtonsAdd changeBackgroundColor={changeBackgroundColor} />
    </React.Fragment>
  )
}
