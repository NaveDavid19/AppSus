import { noteService } from './note.service.js'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'

export const noteUtilsService = {
  loadNotes,
  addNote,
  deleteNote,
  editNote,
  saveNote,
  todoToggle,
  changeBackgroundColor,
  setFilterBy,
  pinNote,
}

const colorMap = {
  coral: '#faafa8',
  peach: '#f39f76',
  sand: '#fff8b8',
  mint: '#e2f6d3',
  sage: '#b4ddd3',
  fog: '#d4e4ed',
  strom: '#aeccdc',
  dusk: '#291d2e',
  blossom: '#f6e2dd',
  clay: '#e9e3d4',
  halk: '#efeff1',
}

// *  --------------------------//CRUD HANDLE //---------------------------  * //

function loadNotes(setNotes) {
  noteService.setFilterBy({ title: '', type: '', color: '' })
  noteService
    .query()
    .then((notes) => {
      setNotes(notes)
    })
    .catch((err) => {
      console.error(err)
    })
}

function addNote(note, setNotes) {
  console.log('NoteIndex.addNote', note)
  noteService
    .save(note)
    .then((note) => {
      return setNotes((prevNotes) => [...prevNotes, note])
    })
    .then(() => {
      showSuccessMsg('Note added successfully')
    })
}

function deleteNote(note, setNotes) {
  const noteId = note.id
  noteService
    .remove(noteId)
    .then((note) => {
      setNotes((prevNotes) => {
        return prevNotes.filter((prevNote) => prevNote.id !== noteId)
      })
    })
    .then(() => {
      showSuccessMsg('Note removed successfully')
    })
}

function editNote(note, setSelectedNote) {
  setSelectedNote(note)
}

function saveNote(note, setNotes, setSelectedNote) {
  const noteId = note.id
  noteService
    .save(note)
    .then((updatedNote) => {
      console.log(updatedNote)
      setNotes((prevNotes) => {
        const idx = prevNotes.findIndex((prevNote) => prevNote.id === noteId)
        prevNotes.splice(idx, 1, updatedNote)
        if (setSelectedNote) setSelectedNote(null)
        return prevNotes
      })
    })
    .then(() => {
      showSuccessMsg('Note saved!')
    })
}

function setFilterBy(title, type, color) {
  console.log({ title, type, color })
  const filterBy = { title, type, color }
  noteService.setFilterBy(filterBy)
  return noteService.query().then((notes) => {
    noteService.setFilterBy({})
    return notes
  })
}

//* -------------------------------------------------------------------------- //

function todoToggle(note, todo, setNotes) {
  const noteId = note.id
  const todoId = todo.id

  setNotes((prevNotes) => {
    const noteIndex = prevNotes.findIndex((note) => note.id === noteId)
    const todoIndex = prevNotes[noteIndex].info.todos.findIndex(
      (todo) => todo.id === todoId
    )
    const newNotes = [...prevNotes]

    newNotes[noteIndex].info.todos[todoIndex].isDone =
      !newNotes[noteIndex].info.todos[todoIndex].isDone

    noteService.save(newNotes[noteIndex]).then(() => {
      if (newNotes[noteIndex].info.todos[todoIndex].isDone)
        showSuccessMsg('Done!')
      else showSuccessMsg('Still got to do that...')
    })
    return newNotes
  })
}

function pinNote(note, setNotes) {
  const noteId = note.id
  setNotes((prevNotes) => {
    const idx = prevNotes.findIndex((prevNote) => prevNote.id === noteId)
    prevNotes[idx].isPinned = !prevNotes[idx].isPinned
    noteService.save(note).then(() => {
      if (prevNotes[idx].isPinned) showSuccessMsg('Pinned note!')
      else showSuccessMsg('Unpinned note!')
    })
    return [...prevNotes]
  })
}

function changeBackgroundColor(colorHex, note, setNotes) {
  const noteId = note.id
  const style = { backgroundColor: colorHex }
  note = { ...note, style }
  console.log(note)
  setNotes((prevNotes) => {
    const noteIndex = prevNotes.findIndex((note) => note.id === noteId)
    prevNotes[noteIndex] = { ...prevNotes[noteIndex], ...note }
    const newNotes = [...prevNotes]
    noteService.save(newNotes[noteIndex]).then(() => {
      showSuccessMsg(`${_getColorKey(colorHex)}`)
    })
    return newNotes
  })
}

function _getColorKey(colorHex) {
  // Convert the colorHex to lowercase for case-insensitive comparison
  const lowerColorHex = colorHex.toLowerCase();

  // Find the key in colorMap based on the provided colorHex
  const colorKey = Object.keys(colorMap).find(
    (key) => colorMap[key].toLowerCase() === lowerColorHex
  );

  return colorKey || 'unknown'; // Return 'unknown' if no matching color is found
}