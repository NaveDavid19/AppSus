import { AddButtonsBtm } from './AddButtonsBtm';
import { ColorButtonsAdd } from './ColorButtons.jsx'
const { useState } = React

import { noteService } from '../services/note.service.js'

export function NoteAddTxt({ addNote, type }) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: '',
    txt: '',
  })
  const [backgroundColor, setBackgroundColor] = useState('#e9e3d4')

  function onSubmitHandle(ev) {
    ev.preventDefault()
    let emptyNote = noteService.getEmptyNote()
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
    emptyNote.style = { backgroundColor }
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

  function changeBackgroundColor(colorHex) {
    setBackgroundColor(colorHex)
  }

  return (
    <React.Fragment>
      <form
        className="add-txt-form"
        style={{ backgroundColor }}
        onSubmit={onSubmitHandle}>
        <input
          className="title-input"
          required
          onChange={onChangeHandle}
          value={newNoteInfo.title}
          type="text"
          placeholder="Title"
          name="title"
          id="title"
        />

        <textarea
          className="txt-input"
          onChange={onChangeHandle}
          value={newNoteInfo.txt}
          rows="4"
          cols="50"
          placeholder="Take a note..."
          name="txt"
          id="txt"
        />

        <div className="add-buttons-section">
          <section className="add-buttons">
            <button type='submit'><i class="fa-solid fa-plus"></i></button>
            <ColorButtonsAdd changeBackgroundColor={changeBackgroundColor} />
          </section>
        </div>
      </form>
    </React.Fragment>
  )
}
