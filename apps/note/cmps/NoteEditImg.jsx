const { useState, useEffect } = React

import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteEditImg({
  selectedNote,
  saveNote,
  deleteNote,
  pinNote,
}) {
  const [currNote, setCurrNote] = useState(selectedNote)
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: currNote.info.title,
    imgUrl: currNote.info.imgUrl,
  })
  const [backgroundColor, setBackgroundColor] = useState(
    currNote.style.backgroundColor
  )
  const [fileUploaded, setFileUploaded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  function onSubmitHandle(ev) {
    ev.preventDefault()

    if (currNote.info.imgUrl === newNoteInfo.imgUrl) {
      saveNote({ ...currNote })
      return
    }
    // Basic regex check for a valid URL if not uploaded through file input
    if (!fileUploaded) {
      const urlRegex =
        /^(ftp|http|https|data:image\/(png|jpeg|jpg|gif|bmp);base64,[^ "]+)$/
      if (!urlRegex.test(newNoteInfo.imgUrl)) {
        Swal.fire({
          title: 'Failed to upload',
          text: 'Invalid Image URL! Please enter a valid URL.',
          icon: 'error',
        })
        return
      }
    }

    let emptyNote = currNote
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
    emptyNote.style = { backgroundColor }

    // Convert the uploaded file to a data URL
    if (newNoteInfo.imgUrl instanceof File) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const dataUrl = e.target.result
        setNewNoteInfo({ ...newNoteInfo, imgUrl: dataUrl }) // Update imgUrl with data URL
        emptyNote.info.imgUrl = dataUrl
        saveNote({ ...emptyNote })
      }
      reader.readAsDataURL(newNoteInfo.imgUrl)
      setFileUploaded(true)
    } else {
      saveNote({ ...emptyNote })
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

    // Update imgUrl field based on input type
    setNewNoteInfo({ ...newNoteInfo, imgUrl: value })

    // Update img src dynamically when a new image is selected
    if (field === 'imgUrl' && target.type === 'file') {
      setFileUploaded(true)

      const reader = new FileReader()
      reader.onload = function (e) {
        const dataUrl = e.target.result
        document.getElementById('note-img').src = dataUrl // Update img src
      }
      reader.readAsDataURL(value)
    }
  }

  function changeBackgroundColor(colorHex) {
    setBackgroundColor(colorHex)
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
        <img
          id="note-img"
          src={newNoteInfo.imgUrl || currNote.info.imgUrl}
          alt={newNoteInfo.title || currNote.info.title}
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
              <i class="fa-solid fa-plus"></i>
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
