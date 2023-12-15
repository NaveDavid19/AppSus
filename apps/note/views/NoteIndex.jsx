const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NotePinnedList } from '../cmps/NotePinnedList.jsx'
import { noteUtilsService } from '../services/note.utils.service.js'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)

  useEffect(() => {
    loadNotes()
  }, [])

  // *  --------------------------//CRUD HANDLE //---------------------------  * //

  function loadNotes() {
    noteUtilsService.loadNotes(setNotes)
  }

  function addNote(note) {
    noteUtilsService.addNote(note, setNotes)
  }

  function deleteNote(note) {
    noteUtilsService.deleteNote(note, setNotes)
  }

  function editNote(note) {
    noteUtilsService.editNote(note, setSelectedNote)
  }

  function saveNote(note) {
    noteUtilsService.saveNote(note, setNotes, setSelectedNote)
  }

  //* -------------------------------------------------------------------------- //

  function todoToggle(note, todo) {
    noteUtilsService.todoToggle(note, todo, setNotes)
  }

  function changeBackgroundColor(colorHex, note) {
    noteUtilsService.changeBackgroundColor(colorHex, note, setNotes)
  }

  // if (!notes) return <div>Loading... </div>
  if (!notes) return <img className="loader" src="assets\img\logos\SusNote.png" />
  return (
    <section className="note-index">
      <div className="search-title">
        <button className="search-btn">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <Link to={'search'}>
          <input type="text" placeholder="Search note" />
        </Link>
        <Link to="/note">
          <button className="close-btn">X</button>
        </Link>
      </div>
      <NoteAdd addNote={addNote} />

      <h2>Pinned Notes</h2>
      <NotePinnedList
        notes={notes}
        changeBackgroundColor={changeBackgroundColor}
        deleteNote={deleteNote}
        editNote={editNote}
        todoToggle={todoToggle}
      />
      <h2>Notes</h2>
      <NoteList
        notes={notes}
        changeBackgroundColor={changeBackgroundColor}
        deleteNote={deleteNote}
        editNote={editNote}
        todoToggle={todoToggle}
      />

      {selectedNote && (
        <NoteEdit
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
        />
      )}
    </section>
  )
}
