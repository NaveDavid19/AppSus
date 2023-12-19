const { useState, useEffect } = React
const { useLocation } = ReactRouterDOM
import { noteService } from '../services/note.service.js'
import { ColorButtonsAdd } from './ColorButtons.jsx'

export function NoteAddImg({ addNote, type }) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: '',
    imgUrl: '', // New property for image URL
  })
  const [backgroundColor, setBackgroundColor] = useState('#e9e3d4')
  const [fileUploaded, setFileUploaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const titleParam = searchParams.get('title') || ''
    const imgUrl = searchParams.get('imgUrl') || ''

    setNewNoteInfo({
      title: titleParam,
      imgUrl: imgUrl
    })
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('title', newNoteInfo.title)
    searchParams.set('imgUrl', newNoteInfo.imgUrl)

    window.history.replaceState(null, null, `#${location.pathname}?${searchParams.toString()}`)
  }, [newNoteInfo])

  function onSubmitHandle(ev) {
    ev.preventDefault()

    // Basic regex check for a valid URL if not uploaded through file input
    if (!fileUploaded) {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
      if (!urlRegex.test(newNoteInfo.imgUrl)) {
        Swal.fire({
          title: "Failed to upload",
          text: 'Invalid Image URL! Please enter a valid URL.',
          icon: "error"
        });
        return
      }
    }

    let emptyNote = noteService.getEmptyNote()
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
    emptyNote.style = { backgroundColor }

    // Convert the uploaded file to a data URL
    if (newNoteInfo.imgUrl instanceof File) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const dataUrl = e.target.result
        emptyNote.info.imgUrl = dataUrl
        addNote({ ...emptyNote, type })
      }
      reader.readAsDataURL(newNoteInfo.imgUrl)
      setFileUploaded(true)
    } else {
      addNote({ ...emptyNote, type })
    }

    setNewNoteInfo({
      title: '',
      imgUrl: '', // Clear image URL after submission
    })
    setFileUploaded(false)
  }

  function onChangeHandle(ev) {
    const target = ev.target
    const field = target.name
    const value = target.type === 'file' ? target.files[0] : target.value

    setNewNoteInfo({ ...newNoteInfo, [field]: value })
    if (field === 'imgUrl' && target.type === 'file') {
      setFileUploaded(true)
    }
  }

  function changeBackgroundColor(colorHex) {
    setBackgroundColor(colorHex)
  }

  return (
    <React.Fragment>
      <form style={{ backgroundColor }} onSubmit={onSubmitHandle}>
        <input
          required
          className="title-input"
          onChange={onChangeHandle}
          type="text"
          placeholder="Title"
          name="title"
          id="title"
          value={newNoteInfo.title}
        />

        {fileUploaded ? (
          <input
            type="text"
            className="imgUrl-input"
            placeholder="Image URL"
            name="imgUrl"
            id="imgUrl"
            value={'Uploading Img File'}
            disabled
          />
        ) : (
          <React.Fragment>
            <input
              onChange={onChangeHandle}
              type="text"
              className="imgUrl-input"
              placeholder="Image URL"
              name="imgUrl"
              id="imgUrl"
              value={newNoteInfo.imgUrl}
            />
            <input
              onChange={onChangeHandle}
              type="file"
              className="imgUrl-upload"
              accept="image/*"
              name="imgUrl"
              id="imgUrl"
            />
          </React.Fragment>
        )}

        <div className="add-buttons-section">
          <section className="add-buttons">
            <button type="submit">
              <i className="fa-solid fa-plus"></i>
            </button>
            <ColorButtonsAdd changeBackgroundColor={changeBackgroundColor} />
          </section>
        </div>
      </form>
    </React.Fragment>
  )
}
