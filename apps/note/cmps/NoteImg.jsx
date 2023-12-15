import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteImg({
  note,
  changeBackgroundColor,
  deleteNote,
  editNote,
  from,
  pinNote,
}) {
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
          <img className='note-img' src={note.info.imgUrl} alt={note.info.title} />

          <PreviewButtons
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
            changeBackgroundColor={changeBackgroundColor}
            pinNote={pinNote}
          />
        </article>
      )
    case 'noteEdit':
  }
}
