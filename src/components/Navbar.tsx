import { useEffect, useId, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export function Navbar() {
  const { isAuthenticated, user } = useAuth()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuId = useId()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'navbar__link navbar__link--active' : 'navbar__link'

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          Angelo
        </NavLink>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
          <span className={open ? 'navbar__burger navbar__burger--open' : 'navbar__burger'}>
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id={menuId}
          className={open ? 'navbar__nav navbar__nav--open' : 'navbar__nav'}
          aria-label="Principal"
        >
          <NavLink to="/" className={linkClass} end>
            Inicio
          </NavLink>
          <NavLink to="/proyectos" className={linkClass}>
            Proyectos
          </NavLink>
          {isAuthenticated ? (
            <NavLink to="/perfil" className={linkClass}>
              {user?.name ?? 'Perfil'}
            </NavLink>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Iniciar sesión
              </NavLink>
              <NavLink to="/registro" className="navbar__cta">
                Registro
              </NavLink>
            </>
          )}
        </nav>
      </div>
      {open ? (
        <button
          type="button"
          className="navbar__backdrop"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  )
}
