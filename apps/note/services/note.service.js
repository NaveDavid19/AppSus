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
      backgroundColor: `#0000ff`,
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
      backgroundColor: '#00ff00',
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
      backgroundColor: '#ff0000',
    },
    info: {
      title: 'Title - 3',
      todos: [
        { txt: 'todo1', isDone: false },
        { txt: 'todo2', isDone: true },
        { txt: 'todo3', isDone: false },
      ],
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
  //TODO : Change Filter options
  return storageService.query(NOTES_KEY).then((notes) => {
    // if (gFilterBy.title) {
    //   const regex = new RegExp(gFilterBy.title, 'i')
    //   notes = notes.filter((note) => regex.test(note.title))
    // }
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
  //TODO Change filter setter
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
  if (filterBy.listPrice !== undefined) gFilterBy.listPrice = filterBy.listPrice
  return gFilterBy
}

// Book utils

function getEmptyNote(
  createdAt = new Date.now(),
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
