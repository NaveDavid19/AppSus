const { useState } = React

import { noteService } from '../services/note.service.js'
import { ColorButtonsAdd } from './ColorButtons.jsx'

export function NoteAddVideo({ addNote, type }) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: '',
    youtubeUrl: '', // New property for YouTube video URL
  })
  const [backgroundColor, setBackgroundColor] = useState('#e9e3d4')

  function onSubmitHandle(ev) {
    ev.preventDefault()

    // Updated regex to accept various YouTube video URL formats
    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?(watch\?v=)?|youtu\.be\/)([^\?&"'>]+)/

    if (!youtubeUrlRegex.test(newNoteInfo.youtubeUrl)) {
      alert('Invalid YouTube Video URL! Please enter a valid URL.')
      return
    }

    let emptyNote = noteService.getEmptyNote()
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
    emptyNote.style = { backgroundColor }
    addNote({ ...emptyNote, type })

    setNewNoteInfo({
      title: '',
      youtubeUrl: '', // Clear YouTube video URL after submission
    })
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
    <React.Fragment>
      <form style={{ backgroundColor }} onSubmit={onSubmitHandle}>
        <input
          required
          className='title-input'
          onChange={onChangeHandle}
          type="text"
          placeholder="Title"
          name="title"
          id="title"
          value={newNoteInfo.title}
        />
        <input
          onChange={onChangeHandle}
          className='videoUrl-input'
          type="text"
          placeholder="YouTube Video URL"
          name="youtubeUrl"
          id="youtubeUrl"
          value={newNoteInfo.youtubeUrl}
        />
        <div className="add-buttons-section">
          <section className="add-buttons">
            <button type='submit'><i class="fa-solid fa-plus"></i></button>
            <ColorButtonsAdd changeBackgroundColor={changeBackgroundColor} />
          </section>
        </div>
      </form>
    </React.Fragment>
  )
}
