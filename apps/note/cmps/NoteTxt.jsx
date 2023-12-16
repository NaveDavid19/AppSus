const { useState } = React

import { LongText } from '../../../cmps/LongText.jsx'
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

  return (
    <article
      onClick={() => {
        editNote(note)
      }}
      className="note-preview"
      style={note.style}>
      <h2 className='note-title'>{note.info.title}</h2>
      <div className="note-txt-conteainer" onClick={(ev)=>ev.stopPropagation()}>
        <LongText  txt={note.info.txt} length={200}/>
      </div>
      {/* <h4 className='note-txt'>{renderTextWithLineBreaks(note.info.txt)}</h4> */}

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
