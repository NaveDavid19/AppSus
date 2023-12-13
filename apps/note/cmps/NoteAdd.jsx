const { useState } = React
import { NoteAddType } from './NoteAddType.jsx'

export function NoteAdd({ addNote }) {
  const [type, setType] = useState('noteTxt')

  function onTypeChange(type) {
    setType(type)
  }

  return (
    <article className="note-add">
      <button
        onClick={() => {
          onTypeChange('noteTxt')
        }}>
        Text
      </button>
      <button
        onClick={() => {
          onTypeChange('noteTodos')
        }}>
        Todos
      </button>
      {type && <NoteAddType addNote={addNote} type={type} />}
    </article>
  )
}
