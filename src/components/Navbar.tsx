import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          Angelo
        </NavLink>
        <nav className="navbar__nav" aria-label="Principal">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
            end
          >
            Inicio
          </NavLink>
          <NavLink
            to="/proyectos"
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Proyectos
          </NavLink>
          {isAuthenticated ? (
            <>
              <span className="navbar__user" title={user?.email}>
                {user?.name}
              </span>
              <button type="button" className="navbar__logout" onClick={logout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
              >
                Iniciar sesión
              </NavLink>
              <NavLink
                to="/registro"
                className={({ isActive }) =>
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
              >
                Registro
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
