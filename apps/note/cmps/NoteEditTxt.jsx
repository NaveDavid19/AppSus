const { useState, useEffect } = React

import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteEditTxt({
  selectedNote,
  setSelectedNote,
  saveNote,
  deleteNote,
  pinNote,
}) {
  const [currNote, setCurrNote] = useState(selectedNote)
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: currNote.info.title,
    txt: currNote.info.txt,
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
    <section className="note-edit-prev-wrapper" onClick={onSubmitHandle}>
      <form
        className="note-edit"
        onClick={(ev) => ev.stopPropagation()}
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
          <section
            className="add-buttons"
            onClick={(ev) => ev.stopPropagation()}>
            <button type="submit">
              <i class="fa-solid fa-plus"></i>
            </button>
            <PreviewButtons
              note={currNote}
              deleteNote={deleteNote}
              setSelectedNote={setSelectedNote}
              changeBackgroundColor={changeBackgroundColor}
              pinNote={pinNote}
            />
          </section>
        </div>
      </form>
    </section>
  )
}
