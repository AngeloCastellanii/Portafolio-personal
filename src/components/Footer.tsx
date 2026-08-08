import { Link } from 'react-router-dom'
import './Footer.css'

const GITHUB_URL = 'https://github.com/AngeloCastellanii'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand-block">
          <p className="footer__brand">Angelo</p>
          <p className="footer__tagline">
            Interfaces con claridad, ritmo y detalle.
          </p>
          <a
            className="footer__github"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            Ver GitHub
          </a>
        </div>
        <nav className="footer__nav" aria-label="Pie de página">
          <Link to="/">Inicio</Link>
          <Link to="/proyectos">Proyectos</Link>
          <Link to="/perfil">Perfil</Link>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
        <p className="footer__copy">© {year}. Hecho con React + Vite.</p>
      </div>
    </footer>
  )
}
