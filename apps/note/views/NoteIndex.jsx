const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    setNotes(noteService.query()).then((notes) => {
      console.log(notes)
    })
  }, [])

  return <div>test</div>
}
