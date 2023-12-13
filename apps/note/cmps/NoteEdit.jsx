import { NotePreview } from './NotePreview.jsx'

export function NoteEdit({ selectedNote, setSelectedNote, saveNote}) {
  return (
    <section className="note-edit">
      <div className="note-edit-prev-wrapper">
        <NotePreview note={selectedNote} saveNote={saveNote} from="noteEdit" />
        <button
          onClick={() => {
            setSelectedNote(null)
          }}>
          close
        </button>
      </div>
    </section>
  )
}
