const { useState } = React

import { noteService } from '../services/note.service.js'

export function NoteAddTxt({ addNote, type }) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: '',
    txt: '',
  })
  function onSubmitHandle(ev) {
    ev.preventDefault()
    let emptyNote = noteService.getEmptyNote()
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
    addNote({ ...emptyNote, type })
    setNewNoteInfo({
      title: '',
      txt: '',
    })
  }

  function onChangeHandle(ev) {
    const target = ev.target
    const field = target.name
    const value = target.value

    setNewNoteInfo({ ...newNoteInfo, [field]: value })
  }

  return (
    <form onSubmit={onSubmitHandle}>
      <input
        required
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
      <button>Add Note</button>
    </form>
  )
}
