import { ColorButtonsAdd } from './ColorButtons.jsx'
import { utilService } from '../../../services/util.service.js'
const { useNavigate } = ReactRouterDOM
export function PreviewButtons({
  note,
  deleteNote,
  changeBackgroundColor,
  pinNote,
}) {
  const navigate = useNavigate()
  function onChangeBackgroundColor(colorHex) {
    changeBackgroundColor(colorHex, note)
  }

  function composeMailBody(note) {
    switch (note.type) {
      case 'noteTxt':
        return note.info.txt
      case 'noteImg':
        return note.info.imgUrl
      case 'noteVideo':
        return note.info.youtubeUrl
      case 'noteTodos':
        if (note.info.todos) {
          return note.info.todos.reduce((acc, todo) => {
            return acc + '\n' + todo.txt
          }, '')
        }
    }
    // return note.info.todos.reduce((todo, acc) => {
    //   return acc + '%20' + todo.txt
    // }, '')
  }
  return (
    <section className="preview-btns" onClick={(ev) => ev.stopPropagation()}>
      <button
        onClick={() => {
          deleteNote(note)
        }}>
        <i className="fa-solid fa-x"></i>
      </button>

      <button
        onClick={() => {
          pinNote(note)
        }}>
        <i
          className={`pin fa-solid fa-thumbtack ${note.isPinned ? 'pinned' : 'unpinned'
            }`}></i>
      </button>
      <button
        onClick={() => {
          navigate(
            `/mail?subject=${note.info.title}&body=${composeMailBody(note)}`
          )
        }}>
        <i className="fa-regular fa-envelope"></i>
      </button>
      <ColorButtonsAdd changeBackgroundColor={onChangeBackgroundColor} />
      <h4>{utilService.getDate(note.createdAt)}</h4>
    </section>
  )
}
