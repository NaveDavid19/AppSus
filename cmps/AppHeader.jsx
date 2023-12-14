const { Link, NavLink, useLocation } = ReactRouterDOM

export function AppHeader() {
  const location = useLocation()

  const getImageSrc = () => {
    switch (location.pathname) {
      case '/mail':
        return 'assets/img/logos/SusMail.png'
      case '/note':
        return 'assets/img/logos/SusNote.png'
      default:
        return 'assets/img/logos/SusApp.png'
    }
  }

  return (
    <header className="app-header">
      <Link to="/">
        <img src={getImageSrc()} alt="" />
      </Link>Lin
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
      </nav>
    </header>
  )
}
