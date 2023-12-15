import { FilterSearchParams } from '../cmps/FilterSearchParams.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NotePinnedList } from '../cmps/NotePinnedList.jsx'
import { noteUtilsService } from '../services/note.utils.service.js'
const { useRef, useEffect, useState } = React

export function NoteSearch() {
  const searchInputRef = useRef()
  const [activeType, setActiveType] = useState(null)
  const [activeColor, setActiveColor] = useState(null)
  const [filteredNotes, setFilteredNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)

  useEffect(() => {
    // Triggering focus on the element when the component mounts
    searchInputRef.current.focus()
  }, [])

  const handleTypeClick = (type) => {
    setActiveType((prevType) => (prevType === type ? null : type))
  }

  const handleColorClick = (color) => {
    setActiveColor((prevColor) => (prevColor === color ? null : color))
  }

  function onSearchParams() {
    noteUtilsService
      .setFilterBy(searchInputRef.current.value, activeType, activeColor)
      .then((notes) => {
        if (!Array.isArray(notes)) {
          // Handle the case where notes is not an array
          setFilteredNotes([])
        } else {
          setFilteredNotes(notes)
        }
      })
      .catch((error) => {
        console.error('Error fetching notes:', error)
        setFilteredNotes([])
      })
  }

  function changeBackgroundColor(colorHex, note) {
    noteUtilsService.changeBackgroundColor(colorHex, note, setFilteredNotes)
  }

  function deleteNote(note) {
    noteUtilsService.deleteNote(note, setFilteredNotes)
  }

  function editNote(note) {
    noteUtilsService.editNote(note, setSelectedNote)
  }

  function todoToggle(note, todo) {
    noteUtilsService.todoToggle(note, todo, setFilteredNotes)
  }

  function saveNote(note) {
    noteUtilsService.saveNote(note, setFilteredNotes, setSelectedNote)
  }

  function pinNote(note) {
    noteUtilsService.pinNote(note, setFilteredNotes)
  }

  return (
    <section className="note-search">
      <FilterSearchParams
        onSearchParams={onSearchParams}
        searchInputRef={searchInputRef}
        activeType={activeType}
        handleTypeClick={handleTypeClick}
        activeColor={activeColor}
        handleColorClick={handleColorClick}
      />
      {filteredNotes.length !== 0 ? (
        <React.Fragment>
          <h2>Pinned Notes</h2>
          <NotePinnedList
            notes={filteredNotes}
            changeBackgroundColor={changeBackgroundColor}
            deleteNote={deleteNote}
            editNote={editNote}
            todoToggle={todoToggle}
            pinNote={pinNote}
          />
          <h2>Notes</h2>
          <NoteList
            notes={filteredNotes}
            changeBackgroundColor={changeBackgroundColor}
            deleteNote={deleteNote}
            editNote={editNote}
            todoToggle={todoToggle}
            pinNote={pinNote}
          />
        </React.Fragment>
      ) : (
        <h2>No notes found</h2>
      )}
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
