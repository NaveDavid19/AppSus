const { useState } = React

import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteTxt({
  note,
  deleteNote,
  editNote,
  saveNote,
  from,
  changeBackgroundColor,
}) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: note.info.title,
    txt: note.info.txt,
  })

  function onSubmitHandle(ev) {
    ev.preventDefault()
    let currNote = { ...note }
    currNote.info = { ...note.info, ...newNoteInfo }
    saveNote(currNote)
  }

  function onChangeHandle(ev) {
    const target = ev.target
    const field = target.name
    const value = target.value

    setNewNoteInfo({ ...newNoteInfo, [field]: value })
  }

  function renderTextWithLineBreaks(text) {
    // Replace newline characters (\n) with <br> HTML element
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  }

  switch (from) {
    case 'noteList':
      return (
        <article className="note-preview" style={note.style}>
          <h2>{note.info.title}</h2>
          <h4>{renderTextWithLineBreaks(note.info.txt)}</h4>
          
          <PreviewButtons
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        </article>
      )

    case 'noteEdit':
      return (
        <article className="note-preview-edit">
          <form onSubmit={onSubmitHandle}>
            <input
              onChange={onChangeHandle}
              type="text"
              value={newNoteInfo.title}
              placeholder="Title"
              name="title"
              id="title"
            />

            <textarea
              onChange={onChangeHandle}
              rows="4"
              cols="50"
              value={newNoteInfo.txt}
              placeholder="Take a note..."
              name="txt"
              id="txt"
            />
            <button>Save</button>
          </form>
        </article>
      )
    default:
      return null
  }
}
