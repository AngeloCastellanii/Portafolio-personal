import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { deleteAccount } from '../services/authService'
import './Page.css'
import './Profile.css'

export function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) return null

  async function handleDelete() {
    if (!user) return
    const confirmed = window.confirm(
      `¿Eliminar la cuenta de ${user.email}? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return

    setLoading(true)
    setError('')
    setMessage('')
    try {
      await deleteAccount(user.email)
      logout()
      navigate('/registro', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar la cuenta.')
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    logout()
    setMessage('Sesión cerrada.')
    navigate('/login', { replace: true })
  }

  const initial = user.name.trim().charAt(0).toUpperCase() || 'A'

  return (
    <section className="profile">
      <header className="profile__header">
        <div className="profile__avatar" aria-hidden="true">
          {initial}
        </div>
        <div>
          <p className="profile__eyebrow">Tu cuenta</p>
          <h1 className="page__title">{user.name}</h1>
          <p className="page__text">{user.email}</p>
        </div>
      </header>

      <div className="profile__grid">
        <article className="profile__card">
          <h2>Sesión</h2>
          <p>Gestiona el acceso a tu portafolio en este navegador.</p>
          <div className="profile__actions">
            <button type="button" className="profile__btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
            <Link to="/proyectos" className="profile__btn profile__btn--ghost">
              Ir a proyectos
            </Link>
          </div>
        </article>

        <article className="profile__card profile__card--danger">
          <h2>Zona sensible</h2>
          <p>
            Eliminar la cuenta borra tu usuario de IndexedDB en este dispositivo.
          </p>
          <button
            type="button"
            className="profile__btn profile__btn--danger"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Eliminando…' : 'Borrar cuenta'}
          </button>
        </article>
      </div>

      {error ? (
        <p className="profile__error" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="profile__ok" role="status">
          {message}
        </p>
      ) : null}
    </section>
  )
}
