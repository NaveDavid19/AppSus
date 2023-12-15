const { useState, useEffect, useRef } = React
const { Link, NavLink, useLocation } = ReactRouterDOM
import { utilService } from '../services/util.service.js'

export function AppHeader() {
  const location = useLocation()
  const [prevImageName, setPrevImageName] = useState(
    getImageName(location.pathname)
  )
  const imgRef = useRef()

  useEffect(() => {
    const currentImageName = getImageName(location.pathname)

    if (currentImageName !== prevImageName) {
      switch (location.pathname) {
        case '/mail':
        case '/mail/inbox':
        case '/mail/star':
        case '/mail/sent':
          utilService.animateCSS(imgRef.current, 'backInLeft').then(() => {
            utilService.animateCSS(imgRef.current, 'rubberBand')
          })
          break
        case '/note':
        case '/note/search':
          utilService.animateCSS(imgRef.current, 'rollIn').then(() => {
            utilService.animateCSS(imgRef.current, 'swing')
          })
          break
        default:
          utilService.animateCSS(imgRef.current, 'wobble').then(() => {
            utilService.animateCSS(imgRef.current, 'tada')
          })
      }
    }

    setPrevImageName(currentImageName)
  }, [location.pathname, prevImageName])

  return (
    <header className="app-header">
      <Link to={getReturnLink}>
        <img
          className="animated"
          src={`assets/img/logos/${getImageName(location.pathname)}.png`}
          alt=""
          ref={imgRef}
        />
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
      </nav>
    </header>
  )
}

function getImageName(pathname) {
  switch (pathname) {
    case '/mail':
    case '/mail/inbox':
    case '/mail/star':
    case '/mail/sent':
      return 'SusMail'
    case '/note':
    case '/note/search':
      return 'SusNote'
    default:
      return 'SusApp'
  }
}

function getReturnLink(pathname) {
  switch (pathname) {
    case '/mail':
    case '/mail/inbox':
    case '/mail/star':
    case '/mail/sent':
      return '/mail'
    case '/note':
    case '/note/search':
      return '/note'
    default:
      return '/home'
  }
}
