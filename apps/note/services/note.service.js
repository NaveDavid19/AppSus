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
    isPinned: true,
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
    isPinned: true,
    style: {
      backgroundColor: '#d4e4ed',
    },
    info: {
      title: 'Book Recommendations',
      txt: `Building a curated list of must-read books based on recommendations from friends and colleagues offers a diverse range of perspectives and genres. Here are some highly acclaimed works that have garnered praise from various sources:

      "The Alchemist" by Paulo Coelho - A philosophical novel exploring the journey of self-discovery and destiny.
      
      "To Kill a Mockingbird" by Harper Lee - A classic tackling issues of racial injustice and moral growth in the American South.
      
      "The Great Gatsby" by F. Scott Fitzgerald - A timeless tale of love, wealth, and the American Dream.
      
      "Sapiens: A Brief History of Humankind" by Yuval Noah Harari - A thought-provoking exploration of human history and evolution.
      
      "The Power of Habit" by Charles Duhigg - An insightful look into the science of habit formation and how it influences our lives.
      
      "Educated" by Tara Westover - A memoir depicting the author's journey from a survivalist family to earning a PhD despite lacking formal education.
      
      "The Night Circus" by Erin Morgenstern - A fantastical novel set in a mysterious circus with a captivating love story.
      
      "The Hitchhiker's Guide to the Galaxy" by Douglas Adams - A humorous sci-fi classic that follows the misadventures of an unwitting space traveler.
      
      "The Kite Runner" by Khaled Hosseini - A powerful novel exploring friendship, betrayal, and redemption against the backdrop of Afghanistan's tumultuous history.
      
      "The Girl on the Train" by Paula Hawkins - A gripping psychological thriller with twists and turns that keep readers on the edge of their seats.
      
      This compilation showcases the eclectic tastes and preferences of those whose recommendations contributed to this list. From fiction to non-fiction, classic to contemporary, these books promise to offer enriching and captivating reading experiences. Whether seeking profound insights or thrilling escapades, there's something for every avid reader on this diverse list.`,
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1701200000000,
    type: 'noteImg',
    isPinned: false,
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
      youtubeUrl: 'https://www.youtube.com/watch?v=FkQuawiGWUw',
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
      backgroundColor: '#d4e4ed',
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
  {
    id: utilService.makeId(),
    createdAt: 1672531200000, // Jan 1, 2023 at 12:00 AM
    type: 'noteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#f39f76',
    },
    info: {
      title: "New Year's Resolutions",
      txt: 'Start the year strong with a list of achievable resolutions like learning a new skill, reading more books, or practicing self-care.',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1675046400000, // Jan 21, 2023 at 6:00 PM
    type: 'noteTodos',
    isPinned: true,
    style: {
      backgroundColor: '#e2f6d3',
    },
    info: {
      title: 'Spring Cleaning Checklist',
      todos: [
        { txt: 'Declutter and donate unused items', isDone: true, id: 't121' },
        { txt: 'Deep clean windows and carpets', isDone: false, id: 't122' },
        { txt: 'Organize closets and drawers', isDone: false, id: 't123' },
        {
          txt: 'Refresh furniture with new throws and pillows',
          isDone: false,
          id: 't124',
        },
        { txt: 'Plant fresh herbs in the kitchen', isDone: false, id: 't125' },
      ],
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1677638400000, // Feb 24, 2023 at 8:00 AM
    type: 'noteVideo',
    isPinned: false,
    style: {
      backgroundColor: '#b4ddd3',
    },
    info: {
      title: 'DIY Terrarium Tutorial',
      youtubeUrl: 'https://www.youtube.com/watch?v=OwoZtv6u9p4',
    },
  },
  // ... 47 more notes ...
  {
    id: utilService.makeId(),
    createdAt: 1704921600000, // Nov 29, 2023 at 8:00 PM
    type: 'noteVideo',
    isPinned: true,
    style: {
      backgroundColor: '#e9e3d4',
    },
    info: {
      title: 'Holiday Baking Inspiration',
      youtubeUrl: 'https://www.youtube.com/watch?v=VMsS-DpdCuI',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1704755200000, // Nov 27, 2023 at 10:00 AM
    type: 'noteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#efeff1',
    },
    info: {
      title: 'Black Friday Shopping Tips',
      txt: 'Set a budget, research prices in advance, and avoid impulse purchases to maximize savings during Black Friday shopping',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1704688000000, // Nov 26, 2023 at 5:00 PM
    type: 'noteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#d4e4ed',
    },
    info: {
      title: 'Holiday Gift Ideas',
      txt: 'Brainstorm unique and personalized gift options for loved ones based on their interests, hobbies, and sentimental value. Consider experiences, handmade crafts, or donations to meaningful causes.',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1704502400000, // Nov 25, 2023 at 1:00 PM
    type: 'noteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#f39f76',
    },
    info: {
      title: 'Budgeting Tips',
      txt: 'Research and implement effective budgeting techniques like the 50/30/20 rule, envelope system, or debt snowball method to manage finances and reach financial goals.',
    },
  },
  // ... 13 more notes ...
  {
    id: utilService.makeId(),
    createdAt: 1704340800000, // Nov 23, 2023 at 9:00 AM
    type: 'noteVideo',
    isPinned: false,
    style: {
      backgroundColor: '#efeff1',
    },
    info: {
      title: 'Masterclass on Time Management',
      youtubeUrl: 'https://www.youtube.com/watch?v=OwoZtv6u9p4',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1704254400000, // Nov 22, 2023 at 1:00 PM
    type: 'noteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#f6e2dd',
    },
    info: {
      title: 'Career Development Plan',
      txt: 'Outline long-term career aspirations, identify skills to develop, research potential employers or educational opportunities, and create a roadmap for professional growth.',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1704168000000, // Nov 21, 2023 at 8:00 AM
    type: 'noteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#aeccdc',
    },
    info: {
      title: 'Self-Care Rituals',
      txt: 'List practices that promote mental and physical well-being like meditation, spending time in nature, practicing gratitude, or engaging in creative hobbies.',
    },
  },
  {
    id: utilService.makeId(),
    createdAt: 1704081600000, // Nov 20, 2023 at 5:00 PM
    type: 'noteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#d4e4ed',
    },
    info: {
      title: 'Gratitude Journal',
      txt: 'Start a daily or weekly gratitude journal to reflect on positive experiences, appreciate blessings, and cultivate a positive mindset.',
    },
  },
  // ... 6 more notes ...
  {
    id: utilService.makeId(),
    createdAt: 1703817600000, // Nov 18, 2023 at 9:00 AM
    type: 'noteVideo',
    isPinned: false,
    style: {
      backgroundColor: '#efeff1',
    },
    info: {
      title: 'Financial Planning Strategies',
      youtubeUrl: 'https://www.youtube.com/watch?v=CYuujJvgmns',
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
      notes = notes.filter(
        (note) => regex.test(note.info.title) || regex.test(note.info.txt)
      )
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
