export function NoteVideo({ note, deleteNote, editNote, from }) {
  function getYouTubeVideoId(url) {
    const match = url.match(/[?&]v=([^?&]+)/)
    return match ? match[1] : null
  }

  switch (from) {
    case 'noteList':
      return (
        <article className="note-preview" style={note.style}>
          <button
            onClick={() => {
              deleteNote(note)
            }}>
            x
          </button>

          <button
            onClick={() => {
              editNote(note)
            }}>
            edit
          </button>
          <h2>{note.info.title}</h2>
          <iframe
            width='200'
            height='150'
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
              note.info.youtubeUrl
            )}`}
            title={note.info.title}
            allowFullScreen></iframe>
        </article>
      )
    case 'noteEdit':
    default:
      return null
  }
}
