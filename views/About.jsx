export function About() {
  return (
    <div className="about-container">
      <h1>About AppSus</h1>
      <p>
        AppSus is a minimalist web application designed during a coding academy
        bootcamp sprint.
      </p>
      <p>
        It aims to provide simple and efficient tools for email management and
        note-taking.
      </p>
      <div className="developer-section">
        <div className="developer">
          <img src="/path/to/dev1.jpg" alt="Developer 1" />
          <p>Nave David</p>
          <div className="social-links">
            <a
              href="https://github.com/johndoe"
              target="_blank"
              rel="noopener noreferrer">
              <i class="fa-brands fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              target="_blank"
              rel="noopener noreferrer">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://twitter.com/johndoe"
              target="_blank"
              rel="noopener noreferrer">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>
        <div className="developer">
          <img src="/path/to/dev2.jpg" alt="Developer 2" />
          <p>Dima Revelson</p>
          <div className="social-links">
            <a
              href="https://github.com/janesmith"
              target="_blank"
              rel="noopener noreferrer">
              <i class="fa-brands fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/janesmith"
              target="_blank"
              rel="noopener noreferrer">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://twitter.com/janesmith"
              target="_blank"
              rel="noopener noreferrer">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
