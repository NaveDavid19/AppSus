const { useState } = React;

import { noteService } from '../services/note.service.js';

export function NoteAddVideo({ addNote, type }) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: '',
    youtubeUrl: '', // New property for YouTube video URL
  });

  function onSubmitHandle(ev) {
    ev.preventDefault();

    // Updated regex to accept various YouTube video URL formats
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?(watch\?v=)?|youtu\.be\/)([^\?&"'>]+)/;

    if (!youtubeUrlRegex.test(newNoteInfo.youtubeUrl)) {
      alert('Invalid YouTube Video URL! Please enter a valid URL.');
      return;
    }

    let emptyNote = noteService.getEmptyNote();
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo };
    addNote({ ...emptyNote, type });

    setNewNoteInfo({
      title: '',
      youtubeUrl: '', // Clear YouTube video URL after submission
    });
  }

  function onChangeHandle(ev) {
    const target = ev.target;
    const field = target.name;
    const value = target.value;

    setNewNoteInfo({ ...newNoteInfo, [field]: value });
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

      <input
        onChange={onChangeHandle}
        type="text"
        placeholder="YouTube Video URL"
        name="youtubeUrl"
        id="youtubeUrl"
        value={newNoteInfo.youtubeUrl}
      />

      <button>Add Note</button>
    </form>
  );
}
