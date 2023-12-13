const { useState, useEffect } = React

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

  function test() {
    console.log(notes)
  }

  if (!notes) return <div>Loading... </div>
  return (
    <section onClick={test}>
      
      <NoteList notes={notes} />
    </section>
  )
}
