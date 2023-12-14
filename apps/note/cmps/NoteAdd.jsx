const { useState } = React
import { NoteAddType } from './NoteAddType.jsx'

export function NoteAdd({ addNote }) {
  const [type, setType] = useState('noteTxt')
  const [selected, setSelected] = useState([true, false, false, false])

  function onTypeChange(type, idx) {
    setType(type)
    let isActives = [false, false, false, false]
    isActives[idx] = true
    setSelected(isActives)
  }
  function isActiveClass(isActive) {
    return isActive ? 'active' : ''
  }

  return (
    <article className="note-add">
      <button
        className={`type-btn ${isActiveClass(selected[0])}`}
        onClick={() => {
          onTypeChange('noteTxt', 0)
        }}>
        Text
      </button>
      <button
        className={`type-btn ${isActiveClass(selected[1])}`}
        onClick={() => {
          onTypeChange('noteTodos', 1)
        }}>
        Todos
      </button>
      <button
        className={`type-btn ${isActiveClass(selected[2])}`}
        onClick={() => {
          onTypeChange('noteImg', 2)
        }}>
        Img
      </button>
      <button
        className={`type-btn ${isActiveClass(selected[3])}`}
        onClick={() => {
          onTypeChange('noteVideo', 3)
        }}>
        Video
      </button>
      {type && <NoteAddType addNote={addNote} type={type} />}
    </article>
  )
}
