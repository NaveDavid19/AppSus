const { NavLink } = ReactRouterDOM

export function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to AppSus!</h1>
      <p>Explore our apps:</p>
      <div className="app-links">
        <NavLink to="/mail">
          <img
            src="assets/img/logos/susMail.png"
            width="50"
            height="50"
            alt="Email App"
          />
        </NavLink>
        <NavLink to="/note">
          <img src="assets/img/logos/susNote.png" alt="Notes App" />
        </NavLink>
      </div>
      <p>Discover the power of simplicity.</p>
    </div>
  )
}
