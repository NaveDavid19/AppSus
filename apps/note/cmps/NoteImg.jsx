import { PreviewButtons } from "./PreviewButtons.jsx";

export function NoteImg({
  note,
  changeBackgroundColor,
  deleteNote,
  editNote,
  from,
}) {
  switch (from) {
    case 'noteList':
      return (
        <article className="note-preview" style={note.style}>
          <PreviewButtons
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
            changeBackgroundColor={changeBackgroundColor}
          />

          <h2>{note.info.title}</h2>
          <img src={note.info.imgUrl} alt="{note.info.title}" />
        </article>
      )
    case 'noteEdit':
  }
}
