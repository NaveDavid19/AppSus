import { ColorButtonsAdd } from './ColorButtons.jsx'
import { utilService } from '../../../services/util.service.js'
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
        <i
          class={`pin fa-solid fa-thumbtack ${
            note.isPinned ? 'pinned' : 'unpinned'
          }`}></i>
      </button>
      <ColorButtonsAdd changeBackgroundColor={onChangeBackgroundColor} />
      <h4>{utilService.getDate(note.createdAt)}</h4>
    </section>
  )
}
