const { useState, useEffect, useRef } = React
const { Link, NavLink, useLocation } = ReactRouterDOM

import { utilService } from '../services/util.service.js'

export function AppHeader() {
  const location = useLocation()
  const [animationClass, setAnimationClass] = useState('')

  const imgRef = useRef()
  useEffect(() => {
    switch (location.pathname) {
      case '/mail':
        utilService.animateCSS(imgRef.current, 'backInLeft').then(() => {
          utilService.animateCSS(imgRef.current, 'rubberBand')
        })
        break
      case '/note':
        utilService.animateCSS(imgRef.current, 'rollIn').then(() => {
          utilService.animateCSS(imgRef.current, 'swing')
        })
        break
      default:
        utilService.animateCSS(imgRef.current, 'wobble').then(() => {
          utilService.animateCSS(imgRef.current, 'tada')
        })
    }
  }, [location.pathname])

  return (
    <header className="app-header">
      <Link to="/">
        <img
          className={animationClass}
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

// Helper function to get the image name based on the path
function getImageName(pathname) {
  switch (pathname) {
    case '/mail':
      return 'SusMail'
    case '/note':
      return 'SusNote'
    default:
      return 'SusApp'
  }
}
