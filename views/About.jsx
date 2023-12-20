import { utilService } from '../services/util.service.js'

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
          <img src="assets/img/devs/nave.jpg" alt="Nave" />
          <p>Nave David</p>
          <div className="social-links">
            <a
              onMouseEnter={(ev) =>
                utilService.animateCSS(ev.target, 'heartBeat')
              }
              href="https://github.com/NaveDavid19"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              onMouseEnter={(ev) =>
                utilService.animateCSS(ev.target, 'heartBeat')
              }
              href="https://www.linkedin.com/in/nave-david-01527a2a6/"
              target="_blank"
              rel="noopener noreferrer">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <div className="developer">
          <img src="assets/img/devs/dima.jpg" alt="Dima" />
          <p>Dima Revelson</p>
          <div className="social-links">
            <a
              onMouseEnter={(ev) =>
                utilService.animateCSS(ev.target, 'heartBeat')
              }
              href="https://github.com/DimRev"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              onMouseEnter={(ev) =>
                utilService.animateCSS(ev.target, 'heartBeat')
              }
              href="https://www.linkedin.com/in/dimrev/"
              target="_blank"
              rel="noopener noreferrer">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
