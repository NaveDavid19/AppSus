const { useState } = React;

import { noteService } from '../services/note.service.js';

export function NoteAddImg({ addNote, type }) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: '',
    imgUrl: '', // New property for image URL
  });

  const [fileUploaded, setFileUploaded] = useState(false);

  function onSubmitHandle(ev) {
    ev.preventDefault();

    // Basic regex check for a valid URL if not uploaded through file input
    if (!fileUploaded) {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(newNoteInfo.imgUrl)) {
        alert('Invalid Image URL! Please enter a valid URL.');
        return;
      }
    }

    let emptyNote = noteService.getEmptyNote();
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo };
    emptyNote.style = {backgroundColor: '#ff0000'}

    // Convert the uploaded file to a data URL
    if (newNoteInfo.imgUrl instanceof File) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const dataUrl = e.target.result;
        emptyNote.info.imgUrl = dataUrl;
        addNote({ ...emptyNote, type });
      };
      reader.readAsDataURL(newNoteInfo.imgUrl);
      setFileUploaded(true);
    } else {
      addNote({ ...emptyNote, type });
    }

    setNewNoteInfo({
      title: '',
      imgUrl: '', // Clear image URL after submission
    });
    setFileUploaded(false);
  }

  function onChangeHandle(ev) {
    const target = ev.target;
    const field = target.name;
    const value = target.type === 'file' ? target.files[0] : target.value;

    setNewNoteInfo({ ...newNoteInfo, [field]: value });
    if (field === 'imgUrl' && target.type === 'file') {
      setFileUploaded(true);
    }
  }

  return (
    <form onSubmit={onSubmitHandle}>
      <input
        required
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
            placeholder="Image URL"
            name="imgUrl"
            id="imgUrl"
            value={newNoteInfo.imgUrl}
          />
          <input
            onChange={onChangeHandle}
            type="file"
            accept="image/*"
            name="imgUrl"
            id="imgUrl"
          />
        </React.Fragment>
      )}

      <button>Add Note</button>
    </form>
  );
}
