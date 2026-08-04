import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Page.css'
import './AuthForm.css'

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/proyectos', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la cuenta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page">
      <h1 className="page__title">Crear cuenta</h1>
      <p className="page__text">Regístrate para acceder al portafolio.</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {error ? <p className="auth-form__error" role="alert">{error}</p> : null}

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="register-name">
            Nombre
          </label>
          <input
            id="register-name"
            className="auth-form__input"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="register-email">
            Correo
          </label>
          <input
            id="register-email"
            className="auth-form__input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="register-password">
            Contraseña
          </label>
          <input
            id="register-password"
            className="auth-form__input"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>

        <button className="auth-form__submit" type="submit" disabled={loading}>
          {loading ? 'Creando…' : 'Registrarme'}
        </button>

        <p className="auth-form__footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </section>
  )
}
