// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'noteDB'
var gFilterBy = { title: '' }

const tempNotes = [
  {
    id: utilService.makeId(),
    createdAt: 1701700000000,
    type: 'noteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#f39f76',
    },
    info: {
      title: 'Project Ideas',
      txt: 'Brainstorm and jot down innovative project ideas for the upcoming presentation.',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1701600000000,
    type: 'noteImg',
    isPinned: true,
    style: {
      backgroundColor: '#e2f6d3',
    },
    info: {
      title: 'Travel Goals',
      imgUrl: 'https://picsum.photos/id/240/200/300',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1701500000000,
    type: 'noteTodos',
    isPinned: false,
    style: {
      backgroundColor: '#b4ddd3',
    },
    info: {
      title: 'Home Improvement',
      todos: [
        { txt: 'Paint the living room walls', isDone: false, id: 't107' },
        { txt: 'Install new shelves', isDone: true, id: 't108' },
        { txt: 'Organize the closet', isDone: false, id: 't109' },
        { txt: 'Replace kitchen faucet', isDone: false, id: 't110' },
        { txt: 'Plant flowers in the garden', isDone: false, id: 't111' },
      ],
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1701400000000,
    type: 'noteVideo',
    isPinned: true,
    style: {
      backgroundColor: '#efeff1',
    },
    info: {
      title: 'Educational Webinar',
      youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1701300000000,
    type: 'noteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#291d2e',
    },
    info: {
      title: 'Book Recommendations',
      txt: 'Compile a list of must-read books suggested by friends and colleagues.',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1701200000000,
    type: 'noteImg',
    isPinned: true,
    style: {
      backgroundColor: '#f6e2dd',
    },
    info: {
      title: 'Art Inspiration',
      imgUrl: 'https://picsum.photos/id/241/200/300',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1701100000000,
    type: 'noteTodos',
    isPinned: false,
    style: {
      backgroundColor: '#aeccdc',
    },
    info: {
      title: 'Fitness Routine',
      todos: [
        { txt: 'Morning jog', isDone: true, id: 't112' },
        { txt: 'High-intensity workout', isDone: false, id: 't113' },
        { txt: 'Yoga session', isDone: false, id: 't114' },
        { txt: 'Healthy meal prep', isDone: false, id: 't115' },
        { txt: 'Drink more water', isDone: false, id: 't116' },
      ],
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1701000000000,
    type: 'noteVideo',
    isPinned: true,
    style: {
      backgroundColor: '#fff8b8',
    },
    info: {
      title: 'Cooking Tutorial',
      youtubeUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1700900000000,
    type: 'noteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#d4e4ed',
    },
    info: {
      title: 'Vacation Planning',
      txt: 'Research and plan activities for the upcoming vacation in Bali.',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1700800000000,
    type: 'noteImg',
    isPinned: true,
    style: {
      backgroundColor: '#faafa8',
    },
    info: {
      title: 'Adventure Time',
      imgUrl: 'https://picsum.photos/id/242/200/300',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1700700000000,
    type: 'noteTodos',
    isPinned: false,
    style: {
      backgroundColor: '#e9e3d4',
    },
    info: {
      title: 'Workout Routine',
      todos: [
        { txt: 'Warm-up exercises', isDone: true, id: 't117' },
        { txt: 'Strength training', isDone: false, id: 't118' },
        { txt: 'Cardio workout', isDone: false, id: 't119' },
        { txt: 'Cool-down stretches', isDone: false, id: 't120' },
      ],
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1700600000000,
    type: 'noteVideo',
    isPinned: true,
    style: {
      backgroundColor: '#291d2e',
    },
    info: {
      title: 'TED Talk: The Power of Positivity',
      youtubeUrl: 'https://www.youtube.com/watch?v=Ks-_Mh1QhMc',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1700500000000,
    type: 'noteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#f6e2dd',
    },
    info: {
      title: 'Recipe Ideas',
      txt: 'Collect new and exciting recipes to try for the weekly family dinners.',
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
    console.log(gFilterBy)
    if (gFilterBy.title) {
      const regex = new RegExp(gFilterBy.title, 'i')
      notes = notes.filter((note) => regex.test(note.info.title))
      console.log(notes, regex)
    }
    if (gFilterBy.type)
      notes = notes.filter((note) => note.type === gFilterBy.type)
    if (gFilterBy.color)
      notes = notes.filter(
        (note) => note.style.backgroundColor === gFilterBy.color
      )
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
  console.log(gFilterBy)
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
