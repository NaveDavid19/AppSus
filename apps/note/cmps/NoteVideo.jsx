import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteVideo({
  note,
  changeBackgroundColor,
  deleteNote,
  editNote,
  from,
}) {
  function getYouTubeVideoId(url) {
    const match = url.match(/[?&]v=([^?&]+)/)
    return match ? match[1] : null
  }

  switch (from) {
    case 'noteList':
      return (
        <article
          onClick={() => {
            editNote(note)
          }}
          className="note-preview"
          style={note.style}>
          <h2>{note.info.title}</h2>
          <iframe
            width="200"
            height="150"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
              note.info.youtubeUrl
            )}`}
            title={note.info.title}
            allowFullScreen></iframe>

          <PreviewButtons
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        </article>
      )
    case 'noteEdit':
    default:
      return null
  }
}
