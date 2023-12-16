const { useRef } = React
const { useNavigate } = ReactRouterDOM
import { utilService } from '../services/util.service.js'

export function Home() {
  const mailRef = useRef()
  const noteRef = useRef()
  const navigate = useNavigate()

  function onAnimate(address) {
    if (address === 'mail') {
      utilService
        .animateCSS(mailRef.current, 'backOutLeft')
        .then(() => navigate('/mail'))
    }
    if (address === 'note') {
      utilService
        .animateCSS(noteRef.current, 'backOutRight')
        .then(() => navigate('/note'))
    }
  }

  return (
    <div className="home-container">
      <h1>Welcome to AppSus!</h1>
      <p>Explore our apps:</p>
      <div className="app-links">
        
            <div className="img-container">
                <img
                  ref={mailRef}
                  onClick={() => onAnimate('mail')}
                  onMouseOver={() => utilService.animateCSS(mailRef.current, 'bounce')}
                  src="assets/img/logos/SusMail.png"
                  alt="Email App"
                />
            </div>

            <div className="img-container">
                <img
                  ref={noteRef}
                  onClick={() => onAnimate('note')}
                  onMouseOver={() => utilService.animateCSS(noteRef.current, 'bounce')}
                  src="assets/img/logos/SusNote.png"
                  alt="Notes App"
                />
            </div>
      </div>
      <p>Discover the power of simplicity.</p>
    </div>
  )
}
