import { NotePreview } from './NotePreview.jsx'

export function NotePinnedList({
  notes,
  deleteNote,
  editNote,
  todoToggle,
  changeBackgroundColor,
  pinNote
}) {
  if (!Array.isArray(notes)) {
    // Handle the case where notes is not an array
    return <div>Error: Notes is not an array</div>
  }

  return (
    <section className="note-list-section">
      <ul className="note-list">
        {notes.map((note) => {
          return (
            note.isPinned && (
              <li key={note.id}>
                <NotePreview
                  note={note}
                  deleteNote={deleteNote}
                  editNote={editNote}
                  todoToggle={todoToggle}
                  changeBackgroundColor={changeBackgroundColor}
                  from="noteList"
                  pinNote={pinNote}
                />
              </li>
            )
          )
        })}
      </ul>
    </section>
  )
}
