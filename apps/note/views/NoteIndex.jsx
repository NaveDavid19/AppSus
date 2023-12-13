const { useState, useEffect } = React

import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService
      .query()
      .then((notes) => {
        setNotes(notes)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function addNote(note) {
    console.log('NoteIndex.addNote', note)
    noteService.save(note).then((note) => {
      setNotes((prevNotes) => [...prevNotes, note])
    })
  }

  function deleteNote(note) {
    
  }

  if (!notes) return <div>Loading... </div>
  return (
    <section className="note-index">
      <NoteAdd addNote={addNote} />
      <NoteList notes={notes} deleteNote={deleteNote} />
    </section>
  )
}
