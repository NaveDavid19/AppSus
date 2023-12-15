import { ColorButtonsAdd } from './ColorButtons.jsx'
export function PreviewButtons({
  note,
  deleteNote,
  changeBackgroundColor,
  pinNote,
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
        <i class="fa-solid fa-x"></i>
      </button>

      <button
        onClick={() => {
          pinNote(note)
        }}>
        <i class="fa-solid fa-thumbtack"></i>
      </button>

      <ColorButtonsAdd changeBackgroundColor={onChangeBackgroundColor} />
    </section>
  )
}
