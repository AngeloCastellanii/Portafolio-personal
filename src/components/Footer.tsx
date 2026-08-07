import { Link } from 'react-router-dom'
import './Footer.css'

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
        </div>
        <nav className="footer__nav" aria-label="Pie de página">
          <Link to="/">Inicio</Link>
          <Link to="/proyectos">Proyectos</Link>
          <Link to="/perfil">Perfil</Link>
        </nav>
        <p className="footer__copy">© {year}. Hecho con React + Vite.</p>
      </div>
    </footer>
  )
}
