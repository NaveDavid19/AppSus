const { useState, useEffect } = React

import { ColorButtonsAdd } from './ColorButtons.jsx'
import { utilService } from '../../../services/util.service.js'
import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteEditTodos({
  selectedNote,
  setSelectedNote,
  saveNote,
  deleteNote,
  pinNote,
}) {
  const [currNote, setCurrNote] = useState(selectedNote)
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: currNote.info.title,
    todos: [...currNote.info.todos],
  })
  const [backgroundColor, setBackgroundColor] = useState(
    currNote.style.backgroundColor
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  function onSubmitHandle(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    let emptyNote = currNote
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
    emptyNote.style = { backgroundColor }
    saveNote(emptyNote)
  }

  function onChangeTitleHandle(ev) {
    const value = ev.target.value
    setNewNoteInfo({ ...newNoteInfo, title: value })
  }

  function onTodoChangeHandle(ev, id) {
    const { name, value } = ev.target
    setNewNoteInfo((prevNoteInfo) => ({
      ...prevNoteInfo,
      todos: prevNoteInfo.todos.map((todo) =>
        todo.id === id ? { ...todo, [name]: value } : todo
      ),
    }))
  }

  function onTodoRemoveHandle(id) {
    setNewNoteInfo((prevNoteInfo) => ({
      ...prevNoteInfo,
      todos: prevNoteInfo.todos.filter((todo) => todo.id !== id),
    }))
  }

  function addTodo() {
    const newTodo = {
      id: utilService.makeId(),
      txt: '',
      isDone: false,
    }
    setNewNoteInfo((prevNoteInfo) => ({
      ...prevNoteInfo,
      todos: [...prevNoteInfo.todos, newTodo],
    }))
  }

  function changeBackgroundColor(colorHex) {
    setBackgroundColor(colorHex)
  }

  return (
    <section className="note-edit-prev-wrapper" onClick={onSubmitHandle}>
      <form
        className="note-edit"
        onClick={(ev) => ev.stopPropagation()}
        style={{ backgroundColor }}
        onSubmit={onSubmitHandle}>
        <input
          className="title-input"
          required
          onChange={onChangeTitleHandle}
          value={newNoteInfo.title}
          type="text"
          placeholder="Title"
          name="title"
          id="title"
        />

        {newNoteInfo.todos.map((todo) => (
          <div key={todo.id} className="todo-wrapper">
            <input
              type="text"
              placeholder="Todo"
              className="todo-input"
              name="txt"
              value={todo.txt}
              onChange={(ev) => onTodoChangeHandle(ev, todo.id)}
            />
            <button
              type="button"
              className="todo-remove-btn"
              onClick={() => onTodoRemoveHandle(todo.id)}>
              <i class="fa-solid fa-x"></i>
            </button>
          </div>
        ))}

        <div className="add-buttons-section">
          <button type="button" onClick={addTodo}>
            Add Todo
          </button>
          <section className="add-buttons">
            <button type="submit">
              <i class="fa-solid fa-plus"></i>
            </button>
            <PreviewButtons
              note={currNote}
              deleteNote={deleteNote}
              changeBackgroundColor={changeBackgroundColor}
              pinNote={pinNote}
            />
          </section>
        </div>
      </form>
    </section>
  )
}
