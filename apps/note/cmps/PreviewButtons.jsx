import { ColorButtonsAdd } from './ColorButtons.jsx'
export function PreviewButtons({
  note,
  deleteNote,
  changeBackgroundColor,
}) {
  function onChangeBackgroundColor(colorHex) {
    changeBackgroundColor(colorHex, note)
  }
  return (
    <section className="preview-btns" onClick={(ev) => ev.stopPropagation()}>
      <button
        onClick={() => {
          deleteNote(note)
        }}>
        x
      </button>

      <ColorButtonsAdd changeBackgroundColor={onChangeBackgroundColor} />
    </section>
  )
}
