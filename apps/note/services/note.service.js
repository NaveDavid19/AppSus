// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'noteDB'
var gFilterBy = { title: '' }

const tempNotes = [
  {
    id: 'n101',
    createdAt: 1702080000000,
    type: 'noteTxt',
    isPinned: true,
    style: {
      backgroundColor: `#aeccdc`,
    },
    info: {
      title: 'Title - 1',
      txt: 'lorem ipsum dolor sit amet con laoreet lore tell tellus et lore tell tellus et lore tellus',
    },
  },
  {
    id: 'n102',
    createdAt: 1701910000000,
    type: 'noteImg',
    isPinned: false,
    style: {
      backgroundColor: '#faafa8',
    },
    info: {
      title: 'Title - 2',
      imgUrl: 'https://picsum.photos/id/237/200/300',
    },
  },
  {
    id: 'n103',
    createdAt: 1701810000000,
    type: 'noteTodos',
    isPinned: false,
    style: {
      backgroundColor: '#fff8b8',
    },
    info: {
      title: 'Title - 3',
      todos: [
        { txt: 'todo1', isDone: false, id: 't101'},
        { txt: 'todo2', isDone: true, id: 't102' },
        { txt: 'todo3', isDone: false, id: 't103' },
      ],
    },
  },
  {
    id: 'n104',
    createdAt: 1701810000000,
    type: 'noteVideo',
    isPinned: false,
    style: {
      backgroundColor: '#e9e3d4',
    },
    info: {
      title: 'Title - 4',
      youtubeUrl: 'https://www.youtube.com/watch?v=hTWKbfoikeg',
    },
  },
]

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getNextNoteId,
  getFilterBy,
  setFilterBy,
}

// Book DB functions

function query() {
  return storageService.query(NOTES_KEY).then((notes) => {
    if (gFilterBy.title) {
      const regex = new RegExp(gFilterBy.title, 'i')
      notes = notes.filter((note) => regex.test(note.info.title))
      console.log(notes, regex)
    }
    if(gFilterBy.type) notes = notes.filter((note) => note.type === gFilterBy.type)
    if(gFilterBy.color) notes = notes.filter((note) => note.style.backgroundColor === gFilterBy.color)
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTES_KEY, note)
  } else {
    return storageService.post(NOTES_KEY, note)
  }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
  if (filterBy.type !== undefined) gFilterBy.type = filterBy.type
  if (filterBy.color !== undefined) gFilterBy.color = filterBy.color
  console.log(gFilterBy);
  return gFilterBy
}

// Book utils

function getEmptyNote(
  createdAt = Date.now(),
  type = 'noteTxt',
  isPinned = false,
  title = 'New Note'
) {
  const emptyNote = {
    createdAt,
    type,
    isPinned,
    info: {
      title,
    },
  }
  return emptyNote
}

function getNextNoteId(noteId) {
  return storageService.query(NOTES_KEY).then((notes) => {
    let nextNoteIdx = notes.findIndex((note) => note.id === noteId) + 1
    if (nextNoteIdx === notes.length) nextNoteIdx = 0
    return notes[nextNoteIdx].id
  })
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = []
    utilService.saveToStorage(NOTES_KEY, tempNotes)
  }
}
