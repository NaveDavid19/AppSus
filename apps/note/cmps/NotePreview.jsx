import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function NotePreview({ note }) {
  switch (note.type) {
    case 'noteTxt':
      return <NoteTxt note={note}/>
      break
      
      case 'noteImg':
      return <NoteImg note={note}/>
      break
      
      case 'noteVideo':
        return <NoteVideo note={note}/>
        break
        
        case 'noteTodos':
      return <NoteTodos note={note}/>
      break
  }
}
