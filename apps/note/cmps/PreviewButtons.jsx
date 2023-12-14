import { ColorButtonsAdd } from './ColorButtons.jsx'
export function PreviewButtons({
  note,
  deleteNote,
  editNote,
  changeBackgroundColor,
}) {
  function onChangeBackgroundColor(colorHex) {
    changeBackgroundColor(colorHex, note)
  }
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

      <ColorButtonsAdd changeBackgroundColor={onChangeBackgroundColor} />
    </section>
  )
}
