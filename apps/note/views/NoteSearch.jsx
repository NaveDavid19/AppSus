import { FilterSearchParams } from '../cmps/FilterSearchParams.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteUtilsService } from '../services/note.utils.service.js'
const { useRef, useEffect, useState } = React
const { Link } = ReactRouterDOM

export function NoteSearch() {
  const searchInputRef = useRef()
  const [activeType, setActiveType] = useState(null)
  const [activeColor, setActiveColor] = useState(null)
  const [filteredNotes, setFilteredNotes] = useState([])

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
        setFilteredNotes(notes)
      })
  }

  function changeBackgroundColor(colorHex, note) {
    noteUtilsService.changeBackgroundColor(colorHex, note, setFilteredNotes)
  }

  function deleteNote(note) {
    noteUtilsService.deleteNote(note, setFilteredNotes)
  }

  function editNote(note) {
    noteUtilsService.editNote(note, setFilteredNotes)
  }

  function todoToggle(note, todo) {
    noteUtilsService.todoToggle(note, todo, setFilteredNotes)
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
      {filteredNotes && (
        <NoteList
          notes={filteredNotes}
          changeBackgroundColor={changeBackgroundColor}
          deleteNote={deleteNote}
          editNote={editNote}
          todoToggle={todoToggle}
        />
      )}
      <Link to="/note">Back</Link>
    </section>
  )
}
