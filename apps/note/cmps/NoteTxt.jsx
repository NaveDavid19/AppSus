const { useState } = React

import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteTxt({
  note,
  deleteNote,
  editNote,
  saveNote,
  changeBackgroundColor,
  pinNote,
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

  return (
    <article
      onClick={() => {
        editNote(note)
      }}
      className="note-preview"
      style={note.style}>
      <h2 className='note-title'>{note.info.title}</h2>
      <h4 className='note-txt'>{renderTextWithLineBreaks(note.info.txt)}</h4>

      <PreviewButtons
        note={note}
        deleteNote={deleteNote}
        editNote={editNote}
        changeBackgroundColor={changeBackgroundColor}
        pinNote={pinNote}
      />
    </article>
  )
}
