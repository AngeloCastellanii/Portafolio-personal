import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">Angelo</p>
        <p className="footer__copy">© {year}. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
