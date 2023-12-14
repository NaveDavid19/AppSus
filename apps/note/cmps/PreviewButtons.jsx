import { ColorButtons } from './ColorButtons.jsx'
export function PreviewButtons({
  note,
  deleteNote,
  editNote,
  changeBackgroundColor,
}) {
  return (
    <section className="preview-btns">
      <button
        onClick={() => {
          deleteNote(note)
        }}>
        x
      </button>

      <button
        onClick={() => {
          editNote(note)
        }}>
        edit
      </button>

      <ColorButtons changeBackgroundColor={changeBackgroundColor} note={note} />
    </section>
  )
}
