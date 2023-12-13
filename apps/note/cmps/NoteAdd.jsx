const { useState } = React
import { noteService } from '../services/note.service.js'

export function NoteAdd({ addNote }) {
  const [newNoteInfo, setNewNoteInfo] = useState({})

  function onSubmitHandle(ev) {
    ev.preventDefault()
    let emptyNote = noteService.getEmptyNote()
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
    addNote(emptyNote)
  }

  function onChangeHandle(ev) {
    const target = ev.target
    const field = target.name
    const value = target.value

    setNewNoteInfo({ ...newNoteInfo, [field]: value })
  }

  return (
    <article className="note-add">
      <form onSubmit={onSubmitHandle}>
        <input
          onChange={onChangeHandle}
          type="text"
          placeholder="Title"
          name="title"
          id="title"
        />

        <textarea
          onChange={onChangeHandle}
          rows="4" 
          cols="50"
          placeholder="Take a note..."
          name="txt"
          id="txt"
        />
        <button>Close</button>
      </form>
    </article>
  )
}
