const { useState, useEffect } = React

import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteEditVideo({
  selectedNote,
  saveNote,
  deleteNote,
  pinNote,
}) {
  const [currNote, setCurrNote] = useState(selectedNote)
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: currNote.info.title,
    youtubeUrl: currNote.info.youtubeUrl,
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

  function onSubmitHandle(ev, isSend) {
    ev.preventDefault()

    // Updated regex to accept various YouTube video URL formats
    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?(watch\?v=)?|youtu\.be\/)([^\?&"'>]+)/

    if (!youtubeUrlRegex.test(newNoteInfo.youtubeUrl)) {
      Swal.fire({
        title: 'Failed to upload',
        text: 'Invalid YouTube Video URL! Please enter a valid URL.',
        icon: 'error',
      })
      return
    }

    let emptyNote = currNote
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
    emptyNote.style = { backgroundColor }
    if (!isSend) saveNote({ ...emptyNote })
    setCurrNote({ ...emptyNote })
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

  function getYouTubeVideoId(url) {
    const match = url.match(/[?&]v=([^?&]+)/)
    return match ? match[1] : null
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
        <iframe
          width="600"
          height="337.5"
          src={`https://www.youtube.com/embed/${getYouTubeVideoId(
            currNote.info.youtubeUrl
          )}`}
          title={currNote.info.title}
          allowFullScreen></iframe>

        <div className="video-input-wrapper">
          <input
            onChange={onChangeHandle}
            className="videoUrl-input"
            type="text"
            placeholder="YouTube Video URL"
            name="youtubeUrl"
            id="youtubeUrl"
            value={newNoteInfo.youtubeUrl}
          />
          <button
            type="button"
            onClick={(event) => onSubmitHandle(event, true)}>
            send
          </button>
        </div>

        <div className="add-buttons-section">
          <section className="add-buttons">
            <button type="submit">
              <i className="fa-solid fa-plus"></i>
            </button>
            <PreviewButtons
              note={currNote}
              deleteNote={deleteNote}
              changeBackgroundColor={changeBackgroundColor}
              pinNote={pinNote}
            />
          </section>
        </div>
      </form>
    </section>
  )
}
