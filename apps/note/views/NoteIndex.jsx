const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    setNotes(
      noteService
        .query()
        .then((notes) => {
          setNotes(notes)
        })
        .catch((err) => {
          console.error(err)
        })
    )
  }, [])

  if (!notes) return <div>Loading... </div>
  return (
    <section>
      test
    </section>
  )
}
