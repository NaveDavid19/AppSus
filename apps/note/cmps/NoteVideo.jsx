import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteVideo({
  note,
  changeBackgroundColor,
  deleteNote,
  editNote,
  from,
  pinNote,
}) {
  function getYouTubeVideoId(url) {
    const match = url.match(/[?&]v=([^?&]+)/)
    return match ? match[1] : null
  }

  return (
    <article
      onClick={() => {
        editNote(note)
      }}
      className="note-preview"
      style={note.style}>
      <h2 className="note-title">{note.info.title}</h2>
      <iframe
        className="note-video"
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
        pinNote={pinNote}
      />
    </article>
  )
}
